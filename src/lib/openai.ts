import { truncateText } from "./cost";
import OpenAI from "openai";

// Model configuration interface
export interface ModelConfig {
  textModel: string;
  maxTokens: number;
  temperature: number;
}

// Input interface for the wizard
export interface WizardInput {
  type: string;
  vibe: string;
  layout: string;
  modules: string[];
  theme: string;
  cta: string;
  brand?: string;
}

// Quote specification interface
export interface QuoteSpec {
  title: string;
  headline: string;
  subheadline: string;
  features: string[];
  modules: string[];
  description: string;
  imagePrompt: string;
  layout: string;
  theme: string;
  cta: string;
}

// Available model configurations for easy switching
export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  // Production config (current)
  production: {
    textModel: "openai/gpt-4o-mini",
    maxTokens: 300,
    temperature: 0.5,
  },
  // Designer-focused: best for high-fidelity specs and UI prompts
  designer: {
    textModel: "openai/gpt-4o",
    maxTokens: 600,
    temperature: 0.6,
  },
  // GPT image model powered by GPT family (closest to 4o image generation via Images API)
  gpt4o_image: {
    textModel: "openai/gpt-4o",
    maxTokens: 600,
    temperature: 0.6,
  },
  // Fast and cheap for testing
  fast: {
    textModel: "openai/gpt-3.5-turbo",
    maxTokens: 200,
    temperature: 0.3,
  },
  // High quality for testing
  quality: {
    textModel: "openai/gpt-4o",
    maxTokens: 500,
    temperature: 0.7,
  },
  // Ultra fast for rapid testing
  rapid: {
    textModel: "openai/gpt-3.5-turbo",
    maxTokens: 150,
    temperature: 0.1,
  },
};

// Get current model configuration from environment or default to production
function getCurrentModelConfig(): ModelConfig {
  const modelProfile = process.env.OPENAI_MODEL_PROFILE || "designer";
  return MODEL_CONFIGS[modelProfile] || MODEL_CONFIGS.production;
}

// Assistant suggestions for redesigned requirements wizard
export interface AssistInput {
  step: "goals" | "features" | "audience" | "priorities";
  description: string; // truncated to 200 chars
  projectType: string; // Website | Web App | Mobile App | Software Tool | Integration/API
  selections?: string[]; // current selected chips for the step
}

export interface AssistResponse {
  suggestions?: string[];
  question?: string;
  warnings?: string[];
}

// Rate limiting and backoff
let lastCallTime = 0;
const MIN_CALL_INTERVAL = 1000; // 1 second

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// OpenRouter-backed client using the OpenAI SDK
export class OpenAIClient {
  private routerApiKey: string;
  private client: OpenAI;
  private modelConfig: ModelConfig;

  constructor() {
    this.routerApiKey = process.env.OPENROUTER_API_KEY || "";
    this.modelConfig = getCurrentModelConfig();

    if (!this.routerApiKey) {
      throw new Error("OPENROUTER_API_KEY environment variable is not set");
    }

    const referer =
      process.env.OPENROUTER_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "";
    const title =
      process.env.OPENROUTER_APP_TITLE ||
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "Showcase";

    this.client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: this.routerApiKey,
      defaultHeaders: {
        ...(referer ? { "HTTP-Referer": referer } : {}),
        ...(title ? { "X-Title": title } : {}),
      },
    });
  }

  // Method to get current model configuration
  getCurrentConfig(): ModelConfig {
    return this.modelConfig;
  }

  // Method to switch model configuration
  switchModel(profile: string): void {
    if (MODEL_CONFIGS[profile]) {
      this.modelConfig = MODEL_CONFIGS[profile];
      console.log(`Switched to model profile: ${profile}`);
    } else {
      console.warn(
        `Unknown model profile: ${profile}. Available profiles: ${Object.keys(
          MODEL_CONFIGS
        ).join(", ")}`
      );
    }
  }

  private async rateLimitGuard(): Promise<void> {
    const now = Date.now();
    if (now - lastCallTime < MIN_CALL_INTERVAL) {
      await delay(MIN_CALL_INTERVAL - (now - lastCallTime));
    }
    lastCallTime = Date.now();
  }

  /**
   * Generates AI assistant suggestions for the requirements wizard.
   *
   * This method provides contextual suggestions, clarifying questions, and warnings
   * to help non-technical users better describe their software project needs.
   *
   * @param input - The assistant input containing step context and user selections
   * @returns Promise resolving to assistant suggestions with optional fields
   *
   * @example
   * ```typescript
   * const suggestions = await client.generateAssistantSuggestions({
   *   step: "goals",
   *   projectType: "Website",
   *   description: "A simple site to showcase my services",
   *   selections: ["Get customers"]
   * });
   * // Returns: { suggestions: ["Share content"], question: "Is your main goal to sell or inform?" }
   * ```
   */
  async generateAssistantSuggestions(
    input: AssistInput
  ): Promise<AssistResponse> {
    const systemPrompt = `You are a friendly project assistant helping non-technical people describe their software ideas.\nAlways respond in plain, everyday language — no technical jargon.\nKeep answers short: at most 1–2 simple sentences, or a list of up to 3 chip-style suggestions.\nNever give long explanations or code.\nIf the user's request is unclear, ask only one simple follow-up question.\nFocus on websites, apps, and software projects only — politely steer back if off-topic.\nYour role is to make their idea clearer, not more complicated.\n\nReturn JSON only with this exact shape (omit empty fields):\n{\n  "suggestions": ["Chip", "Chip", "Chip"],\n  "question": "One short follow-up if needed",\n  "warnings": ["Short warning note if there are trade-offs"]\n}`;

    const payload = {
      step: input.step,
      projectType: input.projectType,
      description: truncateText(input.description || "", 200),
      selections: Array.isArray(input.selections)
        ? input.selections.slice(0, 10)
        : [],
    };

    await this.rateLimitGuard();

    let content: string | undefined;
    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelConfig.textModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(payload) },
        ],
        max_tokens: Math.min(200, this.modelConfig.maxTokens),
        temperature: Math.min(0.6, this.modelConfig.temperature),
        response_format: { type: "json_object" },
      });
      content = completion.choices[0]?.message?.content || undefined;
    } catch (err) {
      console.error("OpenRouter chat error (assist):", err);
      throw err;
    }

    if (!content) {
      throw new Error("No content received for assistant suggestions");
    }

    try {
      const parsed = JSON.parse(content) as AssistResponse;
      // Normalize lengths per rules
      return {
        suggestions: Array.isArray(parsed.suggestions)
          ? parsed.suggestions.slice(0, 3).map((s) => truncateText(s, 40))
          : undefined,
        question: parsed.question
          ? truncateText(parsed.question, 120)
          : undefined,
        warnings: Array.isArray(parsed.warnings)
          ? parsed.warnings.slice(0, 2).map((w) => truncateText(w, 120))
          : undefined,
      };
    } catch {
      // If parsing fails, fall back with no AI content per rules
      return {};
    }
  }

  /**
   * Generates a quote specification based on wizard input.
   */
  async generateQuoteSpec(input: WizardInput): Promise<QuoteSpec> {
    const systemPrompt = `You are a professional copywriter and web designer. Generate a compelling quote specification based on the user input. Return JSON only with this exact shape:
{
  "title": "Project title",
  "headline": "Compelling main headline",
  "subheadline": "Supporting subheadline",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "modules": ["Module 1", "Module 2", "Module 3"],
  "description": "Brief compelling description",
  "imagePrompt": "Detailed image generation prompt",
  "layout": "layout_type",
  "theme": "theme_name",
  "cta": "Call to action text"
}`;

    await this.rateLimitGuard();

    let content: string | undefined;
    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelConfig.textModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(input) },
        ],
        max_tokens: this.modelConfig.maxTokens,
        temperature: this.modelConfig.temperature,
        response_format: { type: "json_object" },
      });
      content = completion.choices[0]?.message?.content || undefined;
    } catch (err) {
      console.error("OpenRouter chat error (quote spec):", err);
      throw err;
    }

    if (!content) {
      throw new Error("No content received for quote specification");
    }

          try {
        const parsed = JSON.parse(content) as QuoteSpec;
        return {
          title: truncateText(parsed.title || "Your Project", 40),
          headline: truncateText(parsed.headline || "Get Started Today", 60),
          subheadline: truncateText(parsed.subheadline || "Transform your business", 100),
          features: Array.isArray(parsed.features) 
            ? parsed.features.slice(0, 5).map(f => truncateText(f, 50))
            : ["Feature 1", "Feature 2", "Feature 3"],
          modules: Array.isArray(parsed.modules) 
            ? parsed.modules.slice(0, 8).map(m => truncateText(m, 30))
            : input.modules || ["Core Module", "Advanced Module"],
          description: truncateText(parsed.description || "Professional solution for your needs", 200),
          imagePrompt: truncateText(parsed.imagePrompt || "Modern professional website", 300),
          layout: parsed.layout || input.layout || "hero_features_cta",
          theme: parsed.theme || input.theme || "light",
          cta: truncateText(parsed.cta || input.cta || "Get Started", 20)
        };
      } catch {
        // Fallback if parsing fails
        return {
          title: "Your Project",
          headline: "Get Started Today",
          subheadline: "Transform your business with our solution",
          features: ["Professional Design", "Fast Performance", "Easy to Use"],
          modules: input.modules || ["Core Module", "Advanced Module"],
          description: "A professional solution tailored to your needs",
          imagePrompt: "Modern, clean, professional website interface",
          layout: input.layout || "hero_features_cta",
          theme: input.theme || "light",
          cta: input.cta || "Get Started"
        };
      }
  }

  /**
   * Generates an image based on the quote specification.
   */
  async generateImage(spec: QuoteSpec): Promise<string> {
    await this.rateLimitGuard();

    try {
      const response = await this.client.images.generate({
        model: "dall-e-3",
        prompt: spec.imagePrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural"
      });

      const imageUrl = response.data?.[0]?.url;
      if (!imageUrl) {
        throw new Error("No image URL received from API");
      }

      return imageUrl;
    } catch (err) {
      console.error("Image generation error:", err);
      // Return a fallback placeholder image
      return "https://via.placeholder.com/1024x1024/f0f0f0/666666?text=Generated+Image";
    }
  }
}

// Lazy initialization to avoid client-side instantiation
let openaiInstance: OpenAIClient | null = null;

export function getOpenAIInstance(): OpenAIClient {
  if (!openaiInstance) {
    // Only create instance on server side
    if (typeof window === "undefined") {
      openaiInstance = new OpenAIClient();
    } else {
      throw new Error("OpenAI client cannot be used on the client side");
    }
  }
  return openaiInstance;
}

// Utility functions for easy model switching
export function switchModel(profile: string): void {
  getOpenAIInstance().switchModel(profile);
}

export function getCurrentModelInfo(): ModelConfig {
  // Return default config for client-side usage
  if (typeof window !== "undefined") {
    return MODEL_CONFIGS.production;
  }
  return getOpenAIInstance().getCurrentConfig();
}

export function listAvailableModels(): string[] {
  return Object.keys(MODEL_CONFIGS);
}

export function getModelConfig(profile: string): ModelConfig | null {
  return MODEL_CONFIGS[profile] || null;
}

// Export the openai instance for use in Netlify functions and other server-side code
export const openai = {
  generateQuoteSpec: (input: WizardInput): Promise<QuoteSpec> => {
    return getOpenAIInstance().generateQuoteSpec(input);
  },
  generateImage: (spec: QuoteSpec): Promise<string> => {
    return getOpenAIInstance().generateImage(spec);
  },
  generateAssistantSuggestions: (input: AssistInput): Promise<AssistResponse> => {
    return getOpenAIInstance().generateAssistantSuggestions(input);
  }
};
