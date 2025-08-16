"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Card,
  Stack,
  Heading,
  Grid,
  Badge,
  Button,
  Input,
  Text,
} from "@/components/ui";

type ProjectType =
  | "Website"
  | "Web App"
  | "Mobile App"
  | "Software Tool"
  | "Integration/API";

interface AssistantNote {
  step: "goals" | "features" | "audience" | "priorities";
  suggestions?: string[];
  question?: string;
  warnings?: string[];
}

interface Brief {
  projectType: ProjectType | "";
  idea: string;
  goals: string[];
  features: string[];
  style: string[];
  audience: string[];
  priorities: string[]; // ordered: most important first
  summary: string;
  contact: { email: string };
  aiNotes: AssistantNote[];
}

const PROJECT_TYPES: ProjectType[] = [
  "Website",
  "Web App",
  "Mobile App",
  "Software Tool",
  "Integration/API",
];

const GOALS = [
  "Get customers",
  "Sell products",
  "Share content",
  "Run my business",
  "Build a tool for my team",
];

const FEATURES = [
  "Login",
  "Payments",
  "Blog",
  "Dashboard",
  "File uploads",
  "Notifications",
  "Search",
  "Chat",
  "Integrations",
];

const STYLES = [
  "Clean & Simple",
  "Bold & Colorful",
  "Professional",
  "Fun",
  "Dark Mode",
  "Light Mode",
];

const AUDIENCES = [
  "General public",
  "Customers",
  "My team",
  "Clients",
  "Members/community",
];

const DEFAULT_PRIORITIES = ["Budget", "Time", "Quality", "Features"];

function Chip({
  label,
  selected,
  onClick,
  className = "",
  style = {},
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Badge
      variant={selected ? "primary" : "secondary"}
      onClick={onClick}
      className={`cursor-pointer select-none transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] flex items-center px-3 py-2 text-sm sm:text-base ${className}`}
      style={style}
    >
      {label}
    </Badge>
  );
}

function ReorderList({
  items,
  onMove,
}: {
  items: string[];
  onMove: (from: number, to: number) => void;
}) {
  return (
    <Stack spacing="sm">
      {items.map((item, index) => (
        <Card
          key={item}
          variant="outlined"
          className="flex items-center justify-between p-3 sm:p-4"
        >
          <span className="text-sm sm:text-base text-white flex-1 pr-2">{item}</span>
          <Stack direction="horizontal" spacing="xs">
            <Button
              size="sm"
              variant="secondary"
              disabled={index === 0}
              onClick={() => onMove(index, index - 1)}
              className="min-w-0 px-2 sm:px-3"
            >
              <span className="hidden sm:inline">Up</span>
              <span className="sm:hidden">↑</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={index === items.length - 1}
              onClick={() => onMove(index, index + 1)}
              className="min-w-0 px-2 sm:px-3"
            >
              <span className="hidden sm:inline">Down</span>
              <span className="sm:hidden">↓</span>
            </Button>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}

function LoadingDots() {
  return (
    <div className="flex space-x-1">
      <div
        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
}

export default function RequirementsWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [aiCalls, setAiCalls] = useState(0);
  const [assistant, setAssistant] = useState<AssistantNote | null>(null);
  const [loadingAssist, setLoadingAssist] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const [brief, setBrief] = useState<Brief>({
    projectType: "",
    idea: "",
    goals: [],
    features: [],
    style: ["Clean & Simple"],
    audience: [],
    priorities: DEFAULT_PRIORITIES,
    summary: "",
    contact: { email: "" },
    aiNotes: [],
  });

  const steps = useMemo(
    () => [
      { key: "intro", title: "Tell me about your idea in 1–2 sentences." },
      { key: "type", title: "What kind of project is it?" },
      { key: "goals", title: "What's the main purpose?" },
      { key: "features", title: "Which features do you need?" },
      { key: "style", title: "Look and feel" },
      { key: "audience", title: "Who is this for?" },
      { key: "priorities", title: "What matters most?" },
      { key: "summary", title: "Review and edit" },
      { key: "contact", title: "Where can I send this?" },
    ],
    []
  );

  /**
   * Checks if AI suggestions can be used for the current step.
   *
   * AI is only available for specific steps.
   *
   * @param key - The current step key
   * @returns True if AI can be used for this step
   */
  const canUseAI = (key: string) =>
    ["goals", "features", "audience", "priorities"].includes(key);

  /**
   * Fetches AI assistant suggestions for the current step.
   *
   * Calls the /api/assist endpoint to get contextual suggestions, questions,
   * or warnings based on the user's current selections and project description.
   *
   * @param stepKey - The current step (goals, features, audience, priorities)
   * @param selections - Current user selections for the step
   */
  async function getAssist(
    stepKey: AssistantNote["step"],
    selections: string[]
  ) {
    if (!canUseAI(stepKey)) return;
    setLoadingAssist(true);
    setError(null);
    setSuggestionsVisible(false);

    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: stepKey,
          projectType: brief.projectType || "Website",
          description: brief.idea,
          selections,
        }),
      });
      const data = await res.json();
      const note: AssistantNote = { step: stepKey, ...data };
      setAssistant(note);
      setBrief((b) => ({
        ...b,
        aiNotes: [...b.aiNotes.filter((n) => n.step !== stepKey), note],
      }));
      setAiCalls((n) => n + 1);

      // Animate suggestions in
      setTimeout(() => setSuggestionsVisible(true), 100);
    } catch (_) {
      // ignore; continue with predefined options
    } finally {
      setLoadingAssist(false);
    }
  }

  // Auto-fetch AI suggestions when entering AI-enabled steps
  useEffect(() => {
    const currentKey = steps[stepIndex].key;
    if (canUseAI(currentKey) && brief.idea.trim()) {
      const stepKey = currentKey as AssistantNote["step"];
      const selections = brief[currentKey as keyof Brief] as string[];
      getAssist(stepKey, selections);
    }
  }, [stepIndex, brief.idea, brief.projectType, steps, canUseAI, getAssist, brief]);

  /**
   * Toggles a selection in a multi-select list.
   *
   * @param list - The current list of selected items
   * @param value - The value to toggle
   * @returns Updated list with the value toggled
   */
  function toggleSelection(list: string[], value: string): string[] {
    return list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
  }

  /**
   * Moves an item in the priorities list up or down.
   *
   * @param from - Current index of the item
   * @param to - Target index for the item
   */
  function movePriority(from: number, to: number) {
    setBrief((b) => {
      const arr = [...b.priorities];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return { ...b, priorities: arr };
    });
  }

  const currentKey = steps[stepIndex].key;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Card variant="dark">
        <Stack spacing="lg">
          {/* Mobile-friendly Progress - show on small screens only current step */}
          <div className="hidden sm:block">
            <Stack direction="horizontal" justify="between" align="center">
              <Stack direction="horizontal" spacing="sm" align="center">
                {steps.map((s, i) => (
                  <Stack
                    key={s.key}
                    direction="horizontal"
                    align="center"
                    spacing="sm"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        i < stepIndex
                          ? "bg-green-500 text-white"
                          : i === stepIndex
                          ? "bg-accent-blue text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`w-12 h-0.5 ${
                          i < stepIndex ? "bg-green-500" : "bg-gray-700"
                        }`}
                      />
                    )}
                  </Stack>
                ))}
              </Stack>
              <span className="text-sm text-gray-400">
                Step {stepIndex + 1} of {steps.length}
              </span>
            </Stack>
          </div>

          {/* Mobile Progress - simplified for small screens */}
          <div className="block sm:hidden">
            <Stack direction="horizontal" justify="between" align="center">
              <div className="text-sm text-gray-400">
                Step {stepIndex + 1} of {steps.length}
              </div>
              <div className="flex items-center space-x-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < stepIndex
                        ? "bg-green-500"
                        : i === stepIndex
                        ? "bg-accent-blue"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </Stack>
          </div>

          <Stack spacing="lg">
            {currentKey !== "intro" && (
              <Heading level={4} className="mb-0 text-center sm:text-left">
                {steps[stepIndex].title}
              </Heading>
            )}

            {currentKey === "intro" && (
              <div className="py-8 sm:py-12 text-center">
                <Stack spacing="xl" align="center">
                  {/* Hero Section */}
                  <Stack spacing="lg" align="center" className="max-w-3xl mx-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">✨</span>
                    </div>
                    <Heading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Tell me about your idea
                    </Heading>
                    <Text 
                      size="lg" 
                      variant="muted" 
                      className="text-lg sm:text-xl text-gray-300 leading-relaxed"
                    >
                      Describe your project vision in your own words. Whether it&apos;s a simple website, 
                      a complex app, or something in between—just share what you have in mind.
                    </Text>
                  </Stack>

                  {/* Main Input Area */}
                  <div className="w-full max-w-4xl mx-auto">
                    <div className="relative">
                      <textarea
                        value={brief.idea}
                        onChange={(e) =>
                          setBrief((b) => ({ ...b, idea: e.target.value }))
                        }
                        placeholder="Example: I want to build a simple website where I can showcase my photography portfolio, allow clients to book sessions, and maybe sell some prints online. It should look modern and clean..."
                        maxLength={500}
                        className="w-full h-32 sm:h-40 px-6 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-200 text-base sm:text-lg leading-relaxed resize-none backdrop-blur-sm"
                      />
                      <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-gray-500 bg-gray-900/80 px-2 py-1 rounded-md">
                        {brief.idea.length}/500
                      </div>
                    </div>
                  </div>


                </Stack>
              </div>
            )}

            {currentKey === "type" && (
              <Grid cols={2} gap="md" responsive>
                {PROJECT_TYPES.map((t) => (
                  <Card
                    key={t}
                    variant={brief.projectType === t ? "default" : "outlined"}
                    className={`cursor-pointer text-center sm:text-left ${
                      brief.projectType === t
                        ? "border-accent-blue bg-gray-800"
                        : "hover:border-gray-500"
                    }`}
                    onClick={() => setBrief((b) => ({ ...b, projectType: t }))}
                  >
                    <Heading level={6} className="mb-0 text-white">
                      {t}
                    </Heading>
                  </Card>
                ))}
              </Grid>
            )}

            {currentKey === "goals" && (
              <Stack spacing="md">
                <Stack direction="horizontal" spacing="sm" wrap>
                  {GOALS.map((g) => (
                    <Chip
                      key={g}
                      label={g}
                      selected={brief.goals.includes(g)}
                      onClick={() =>
                        setBrief((b) => ({
                          ...b,
                          goals: toggleSelection(b.goals, g),
                        }))
                      }
                    />
                  ))}
                  {loadingAssist && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-full">
                      <LoadingDots />
                      <span className="text-xs text-gray-400">
                        Getting ideas...
                      </span>
                    </div>
                  )}
                  {assistant?.step === "goals" &&
                    assistant.suggestions &&
                    suggestionsVisible && (
                      <div className="w-full">
                        <Text size="sm" variant="muted" className="mb-3">
                          AI Suggestions:
                        </Text>
                        <Stack spacing="sm">
                          {assistant.suggestions.map((s, index) => (
                            <Card
                              key={s}
                              variant="outlined"
                              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] animate-fadeIn border-blue-600/30 bg-blue-900/10 hover:bg-blue-900/20 ${
                                brief.goals.includes(s) ? 'border-blue-500 bg-blue-900/30' : ''
                              }`}
                              style={{ animationDelay: `${index * 100}ms` }}
                              onClick={() =>
                                setBrief((b) => ({
                                  ...b,
                                  goals: toggleSelection(b.goals, s),
                                }))
                              }
                            >
                              <Stack direction="horizontal" spacing="sm" align="center">
                                <div className={`w-2 h-2 rounded-full ${brief.goals.includes(s) ? 'bg-blue-400' : 'bg-gray-600'}`} />
                                <Text size="sm" className="text-white flex-1">{s}</Text>
                                {brief.goals.includes(s) && (
                                  <div className="text-blue-400 text-sm">✓</div>
                                )}
                              </Stack>
                            </Card>
                          ))}
                        </Stack>
                      </div>
                    )}
                </Stack>

                {assistant?.step === "goals" &&
                  assistant.question &&
                  suggestionsVisible && (
                    <Card
                      variant="outlined"
                      className="border-blue-700 bg-blue-900/20 animate-fadeIn"
                    >
                      <Text size="sm" className="text-white">
                        {assistant.question}
                      </Text>
                    </Card>
                  )}
              </Stack>
            )}

            {currentKey === "features" && (
              <Stack spacing="md">
                <Stack direction="horizontal" spacing="sm" wrap>
                  {FEATURES.map((f) => (
                    <Chip
                      key={f}
                      label={f}
                      selected={brief.features.includes(f)}
                      onClick={() =>
                        setBrief((b) => ({
                          ...b,
                          features: toggleSelection(b.features, f),
                        }))
                      }
                    />
                  ))}
                  {loadingAssist && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-full">
                      <LoadingDots />
                      <span className="text-xs text-gray-400">
                        Getting ideas...
                      </span>
                    </div>
                  )}
                  {assistant?.step === "features" &&
                    assistant.suggestions &&
                    suggestionsVisible && (
                      <div className="w-full">
                        <Text size="sm" variant="muted" className="mb-3">
                          AI Suggestions:
                        </Text>
                        <Stack spacing="sm">
                          {assistant.suggestions.map((s, index) => (
                            <Card
                              key={s}
                              variant="outlined"
                              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] animate-fadeIn border-blue-600/30 bg-blue-900/10 hover:bg-blue-900/20 ${
                                brief.features.includes(s) ? 'border-blue-500 bg-blue-900/30' : ''
                              }`}
                              style={{ animationDelay: `${index * 100}ms` }}
                              onClick={() =>
                                setBrief((b) => ({
                                  ...b,
                                  features: toggleSelection(b.features, s),
                                }))
                              }
                            >
                              <Stack direction="horizontal" spacing="sm" align="center">
                                <div className={`w-2 h-2 rounded-full ${brief.features.includes(s) ? 'bg-blue-400' : 'bg-gray-600'}`} />
                                <Text size="sm" className="text-white flex-1">{s}</Text>
                                {brief.features.includes(s) && (
                                  <div className="text-blue-400 text-sm">✓</div>
                                )}
                              </Stack>
                            </Card>
                          ))}
                        </Stack>
                      </div>
                    )}
                </Stack>
              </Stack>
            )}

            {currentKey === "style" && (
              <Stack spacing="md">
                <Stack direction="horizontal" spacing="sm" wrap>
                  {STYLES.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      selected={brief.style.includes(s)}
                      onClick={() =>
                        setBrief((b) => ({
                          ...b,
                          style: toggleSelection(b.style, s),
                        }))
                      }
                    />
                  ))}
                </Stack>
              </Stack>
            )}

            {currentKey === "audience" && (
              <Stack spacing="md">
                <Stack direction="horizontal" spacing="sm" wrap>
                  {AUDIENCES.map((a) => (
                    <Chip
                      key={a}
                      label={a}
                      selected={brief.audience.includes(a)}
                      onClick={() =>
                        setBrief((b) => ({
                          ...b,
                          audience: toggleSelection(b.audience, a),
                        }))
                      }
                    />
                  ))}
                  {loadingAssist && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-full">
                      <LoadingDots />
                      <span className="text-xs text-gray-400">
                        Getting ideas...
                      </span>
                    </div>
                  )}
                  {assistant?.step === "audience" &&
                    assistant.suggestions &&
                    suggestionsVisible && (
                      <div className="w-full">
                        <Text size="sm" variant="muted" className="mb-3">
                          AI Suggestions:
                        </Text>
                        <Stack spacing="sm">
                          {assistant.suggestions.map((s, index) => (
                            <Card
                              key={s}
                              variant="outlined"
                              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] animate-fadeIn border-blue-600/30 bg-blue-900/10 hover:bg-blue-900/20 ${
                                brief.audience.includes(s) ? 'border-blue-500 bg-blue-900/30' : ''
                              }`}
                              style={{ animationDelay: `${index * 100}ms` }}
                              onClick={() =>
                                setBrief((b) => ({
                                  ...b,
                                  audience: toggleSelection(b.audience, s),
                                }))
                              }
                            >
                              <Stack direction="horizontal" spacing="sm" align="center">
                                <div className={`w-2 h-2 rounded-full ${brief.audience.includes(s) ? 'bg-blue-400' : 'bg-gray-600'}`} />
                                <Text size="sm" className="text-white flex-1">{s}</Text>
                                {brief.audience.includes(s) && (
                                  <div className="text-blue-400 text-sm">✓</div>
                                )}
                              </Stack>
                            </Card>
                          ))}
                        </Stack>
                      </div>
                    )}
                </Stack>
                {assistant?.step === "audience" &&
                  assistant.question &&
                  suggestionsVisible && (
                    <Card
                      variant="outlined"
                      className="border-blue-700 bg-blue-900/20 animate-fadeIn"
                    >
                      <Text size="sm" className="text-white">
                        {assistant.question}
                      </Text>
                    </Card>
                  )}
              </Stack>
            )}

            {currentKey === "priorities" && (
              <Stack spacing="md">
                <ReorderList items={brief.priorities} onMove={movePriority} />
                {loadingAssist && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-full">
                    <LoadingDots />
                    <span className="text-xs text-gray-400">
                      Checking trade-offs...
                    </span>
                  </div>
                )}
                {assistant?.step === "priorities" &&
                  assistant.warnings &&
                  suggestionsVisible && (
                    <Card
                      variant="outlined"
                      className="border-yellow-700 bg-yellow-900/20 animate-fadeIn"
                    >
                      <Text size="sm" className="text-white">
                        {assistant.warnings.join(" ")}
                      </Text>
                    </Card>
                  )}
              </Stack>
            )}

            {currentKey === "summary" && (
              <Stack spacing="md">
                <Text size="sm" variant="muted">
                  Plain-English summary (you can edit):
                </Text>
                <textarea
                  value={
                    brief.summary ||
                    `${brief.projectType || "Project"}: ${
                      brief.idea || "No description"
                    }. Goals: ${brief.goals.join(", ") || "-"}. Features: ${
                      brief.features.join(", ") || "-"
                    }. Audience: ${brief.audience.join(", ") || "-"}. Style: ${
                      brief.style.join(", ") || "-"
                    }. Priorities: ${brief.priorities.join(" > ")}.`
                  }
                  onChange={(e) =>
                    setBrief((b) => ({ ...b, summary: e.target.value }))
                  }
                  className="w-full h-32 p-3 rounded bg-gray-800 text-white text-sm resize-none"
                />
              </Stack>
            )}

            {currentKey === "contact" && (
              <Stack spacing="md">
                <Input
                  label="Email"
                  type="email"
                  value={brief.contact.email}
                  onChange={(e) =>
                    setBrief((b) => ({
                      ...b,
                      contact: { email: e.target.value },
                    }))
                  }
                  placeholder="you@example.com"
                />
                <Card variant="outlined">
                  <Heading level={6} className="mb-0 text-white">
                    Your JSON brief
                  </Heading>
                  <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-gray-300 overflow-x-auto">
                    {JSON.stringify(
                      {
                        projectType: brief.projectType,
                        goals: brief.goals,
                        features: brief.features,
                        style: brief.style,
                        audience: brief.audience,
                        priorities: brief.priorities,
                        summary: brief.summary,
                        contact: brief.contact,
                        aiNotes: brief.aiNotes,
                      },
                      null,
                      2
                    )}
                  </pre>
                  <Stack direction="horizontal" spacing="sm" className="mt-2">
                    <Button
                      variant="secondary"
                      onClick={async () => {
                        await navigator.clipboard.writeText(
                          JSON.stringify(
                            {
                              projectType: brief.projectType,
                              goals: brief.goals,
                              features: brief.features,
                              style: brief.style,
                              audience: brief.audience,
                              priorities: brief.priorities,
                              summary: brief.summary,
                              contact: brief.contact,
                              aiNotes: brief.aiNotes,
                            },
                            null,
                            2
                          )
                        );
                      }}
                    >
                      Copy JSON
                    </Button>
                  </Stack>
                </Card>
              </Stack>
            )}

            {error && (
              <Card variant="outlined" className="border-red-500 bg-red-900/20">
                <p className="text-red-400">{error}</p>
              </Card>
            )}
          </Stack>

          {/* Mobile-friendly Navigation */}
          <Stack direction="horizontal" justify="between" className="pt-4 border-t border-gray-700">
            <Button
              variant="ghost"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="min-w-0 px-3 sm:px-4"
            >
              <span className="hidden sm:inline">Back</span>
              <span className="sm:hidden">←</span>
            </Button>
            {stepIndex < steps.length - 1 ? (
              <Button
                variant="primary"
                disabled={(() => {
                  switch (currentKey) {
                    case "intro":
                      return brief.idea.trim().length < 10;
                    case "type":
                      return !brief.projectType;
                    case "goals":
                      return brief.goals.length === 0;
                    case "features":
                      return brief.features.length === 0;
                    case "style":
                      return brief.style.length === 0;
                    case "audience":
                      return brief.audience.length === 0;
                    case "priorities":
                      return brief.priorities.length !== 4;
                    default:
                      return false;
                  }
                })()}
                onClick={() => setStepIndex((i) => i + 1)}
                className="min-w-0 px-3 sm:px-4"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">→</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled={!brief.contact.email}
                onClick={() => {
                  // no-op: JSON is ready; you could POST it to your backend here
                }}
                className="min-w-0 px-3 sm:px-4"
              >
                <span className="hidden sm:inline">Finish</span>
                <span className="sm:hidden">✓</span>
              </Button>
            )}
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}
