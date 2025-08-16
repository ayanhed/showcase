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
import CostNotice from "@/components/CostNotice";

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
      className={`cursor-pointer select-none ${className}`}
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
          className="flex items-center justify-between"
        >
          <span className="text-sm text-white">{item}</span>
          <Stack direction="horizontal" spacing="xs">
            <Button
              size="sm"
              variant="secondary"
              disabled={index === 0}
              onClick={() => onMove(index, index - 1)}
            >
              Up
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={index === items.length - 1}
              onClick={() => onMove(index, index + 1)}
            >
              Down
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
   * AI is only available for specific steps and limited to 7 calls per session
   * to control costs and maintain simplicity.
   *
   * @param key - The current step key
   * @returns True if AI can be used for this step
   */
  const canUseAI = (key: string) =>
    ["goals", "features", "audience", "priorities"].includes(key) &&
    aiCalls < 7;

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
    } catch (e) {
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
  }, [stepIndex, brief.idea, brief.projectType]);

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
    <div className="max-w-4xl mx-auto p-6">
      <Card variant="dark">
        <Stack spacing="lg">
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

          <Stack spacing="lg">
            <Heading level={4} className="mb-0">
              {steps[stepIndex].title}
            </Heading>

            {currentKey === "intro" && (
              <Stack spacing="md">
                <Input
                  label="Your idea"
                  type="text"
                  maxLength={200}
                  value={brief.idea}
                  onChange={(e) =>
                    setBrief((b) => ({ ...b, idea: e.target.value }))
                  }
                  placeholder="Example: A simple site to share my services and let people book"
                  helperText={`${brief.idea.length}/200 characters`}
                />
                {brief.idea && !brief.projectType && (
                  <Text size="sm" variant="muted">
                    This tool is for software projects. Pick the closest option
                    in the next step.
                  </Text>
                )}
              </Stack>
            )}

            {currentKey === "type" && (
              <Grid cols={3} gap="md" responsive>
                {PROJECT_TYPES.map((t) => (
                  <Card
                    key={t}
                    variant={brief.projectType === t ? "default" : "outlined"}
                    className={`cursor-pointer ${
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
                      <div className="space-y-1">
                        {assistant.suggestions.map((s, index) => (
                          <Chip
                            key={s}
                            label={s}
                            selected={brief.goals.includes(s)}
                            onClick={() =>
                              setBrief((b) => ({
                                ...b,
                                goals: toggleSelection(b.goals, s),
                              }))
                            }
                            className={`animate-fadeIn`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          />
                        ))}
                      </div>
                    )}
                </Stack>
                {aiCalls >= 20 && (
                  <Text size="sm" variant="muted">
                    AI suggestion limit reached
                  </Text>
                )}
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
                      <div className="space-y-1">
                        {assistant.suggestions.map((s, index) => (
                          <Chip
                            key={s}
                            label={s}
                            selected={brief.features.includes(s)}
                            onClick={() =>
                              setBrief((b) => ({
                                ...b,
                                features: toggleSelection(b.features, s),
                              }))
                            }
                            className={`animate-fadeIn`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          />
                        ))}
                      </div>
                    )}
                </Stack>
                {aiCalls >= 7 && (
                  <Text size="sm" variant="muted">
                    AI suggestion limit reached
                  </Text>
                )}
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
                      <div className="space-y-1">
                        {assistant.suggestions.map((s, index) => (
                          <Chip
                            key={s}
                            label={s}
                            selected={brief.audience.includes(s)}
                            onClick={() =>
                              setBrief((b) => ({
                                ...b,
                                audience: toggleSelection(b.audience, s),
                              }))
                            }
                            className={`animate-fadeIn`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          />
                        ))}
                      </div>
                    )}
                </Stack>
                {aiCalls >= 7 && (
                  <Text size="sm" variant="muted">
                    AI suggestion limit reached
                  </Text>
                )}
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
                {aiCalls >= 7 && (
                  <Text size="sm" variant="muted">
                    AI suggestion limit reached
                  </Text>
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
                  className="w-full h-32 p-3 rounded bg-gray-800 text-white text-sm"
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
                  <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-gray-300">
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

          <Stack direction="horizontal" justify="between">
            <Button
              variant="ghost"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            >
              Back
            </Button>
            {stepIndex < steps.length - 1 ? (
              <Button
                variant="primary"
                disabled={(() => {
                  switch (currentKey) {
                    case "intro":
                      return brief.idea.trim().length === 0;
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
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled={!brief.contact.email}
                onClick={() => {
                  // no-op: JSON is ready; you could POST it to your backend here
                }}
              >
                Finish
              </Button>
            )}
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}
