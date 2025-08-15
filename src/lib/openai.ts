import { estimateTokens, truncateText } from './cost';

export interface QuoteSpec {
  title: string;
  palette: string[];
  layout: string;
  modules: string[];
  vibe?: string;
  copy: {
    headline: string;
    cta: string;
  };
  accessibility: {
    contrast: string;
  };
}

export interface WizardInput {
  type: string;
  vibe: string;
  layout: string;
  modules: string[];
  theme: string;
  cta: string;
  brand?: string;
}

// Rate limiting and backoff
let lastCallTime = 0;
const MIN_CALL_INTERVAL = 1000; // 1 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const exponentialBackoff = async (attempt: number): Promise<void> => {
  const baseDelay = 1000;
  const maxDelay = 30000;
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  const jitter = Math.random() * 0.1 * delay;
  await new Promise(resolve => setTimeout(resolve, delay + jitter));
};

// OpenAI client with streaming
export class OpenAIClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  private async makeRequest(endpoint: string, options: RequestInit): Promise<Response> {
    const now = Date.now();
    if (now - lastCallTime < MIN_CALL_INTERVAL) {
      await delay(MIN_CALL_INTERVAL - (now - lastCallTime));
    }
    lastCallTime = Date.now();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.status === 429) {
      // Rate limited - implement exponential backoff
      const attempt = parseInt(response.headers.get('x-ratelimit-reset-requests') || '1');
      await exponentialBackoff(attempt);
      return this.makeRequest(endpoint, options);
    }

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async generateQuoteSpec(input: WizardInput): Promise<QuoteSpec> {
    const systemPrompt = 'You produce terse, strictly-valid JSON specs for UI mocks. No prose. If unsure, pick sensible defaults. Keep strings short.';
    
    const userContent = JSON.stringify({
      type: input.type,
      vibe: input.vibe,
      layout: input.layout,
      modules: input.modules,
      theme: input.theme,
      cta: truncateText(input.cta, 20),
      brand: input.brand || 'default'
    });

    const inputTokens = estimateTokens(systemPrompt + userContent);
    console.log(`Estimated input tokens: ${inputTokens}`);

    const response = await this.makeRequest('/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        max_tokens: 300,
        temperature: 0.5,
        response_format: { type: 'json_object' },
        stream: false
      })
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    try {
      const spec = JSON.parse(content);
      return this.validateQuoteSpec(spec);
    } catch {
      console.error('Failed to parse JSON response:', content);
      throw new Error('Invalid JSON response from AI');
    }
  }

  private validateQuoteSpec(spec: Record<string, unknown>): QuoteSpec {
    // Ensure required fields exist with sensible defaults
    return {
      title: (spec.title as string) || 'Project Mock',
      palette: Array.isArray(spec.palette) ? (spec.palette as string[]) : ['#3b82f6', '#1f2937'],
      layout: (spec.layout as string) || 'hero_features_cta',
      modules: Array.isArray(spec.modules) ? (spec.modules as string[]) : [],
      vibe: (spec.vibe as string) || 'minimal',
      copy: {
        headline: ((spec.copy as Record<string, unknown>)?.headline as string) || 'Welcome',
        cta: ((spec.copy as Record<string, unknown>)?.cta as string) || 'Get Started'
      },
      accessibility: {
        contrast: ((spec.accessibility as Record<string, unknown>)?.contrast as string) || 'AA'
      }
    };
  }

  async generateImage(spec: QuoteSpec): Promise<string> {
    const prompt = this.buildImagePrompt(spec);
    
    const response = await this.makeRequest('/images/generations', {
      method: 'POST',
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x768',
        quality: 'standard',
        response_format: 'url'
      })
    });

    const data = await response.json();
    const imageUrl = data.data[0]?.url;
    
    if (!imageUrl) {
      throw new Error('No image URL received from OpenAI');
    }

    return imageUrl;
  }

  private buildImagePrompt(spec: QuoteSpec): string {
    const layoutDescriptions = {
      hero_features_cta: 'hero section with features below and call-to-action button',
      sidebar_app: 'sidebar navigation with main content area',
      auth_dashboard: 'login form with dashboard interface',
      storefront_grid: 'product grid layout with cards',
      marketing_landing: 'marketing landing page with conversion elements'
    };

    const vibeDescriptions = {
      minimal: 'minimalist design with clean lines and white space',
      corporate: 'professional corporate design with blue tones',
      playful: 'colorful and fun design with rounded elements',
      bold: 'high contrast design with strong typography',
      luxury: 'elegant design with gold accents and premium feel'
    };

    const layout = layoutDescriptions[spec.layout as keyof typeof layoutDescriptions] || 'modern web interface';
    const vibe = vibeDescriptions[spec.vibe as keyof typeof vibeDescriptions] || 'clean design';
    const colors = spec.palette.join(' and ');
    
    const modules = spec.modules.length > 0 ? 
      `including ${spec.modules.slice(0, 3).join(', ')} sections` : '';

    return `A single screen ${layout} with ${vibe} using ${colors} color palette, ${modules}. Clean UI mockup with sample text "${spec.copy.headline}" and "${spec.copy.cta}" button. No real brand names, no photos, just interface elements.`;
  }
}

export const openai = new OpenAIClient();