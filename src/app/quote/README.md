# AI Requirements Wizard

An AI-powered interactive wizard that gathers high-level project requirements with presets and friendly AI suggestions. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Guided Wizard**: Simple steps tailored for non-technical users
- **AI Suggestions**: Context-aware recommendations for layout, modules, theme, CTA
- **Cost Optimized**: Strict token limits and budget controls
- **Lightweight Preview**: Non-technical live preview to build confidence
- **Share Results**: Generate shareable links with encoded specs
- **Local Storage**: Caches recent requirement specs for quick access
- **API Routes**: Next.js API Routes for simple integration

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Next.js API Routes
- **AI**: OpenRouter (OpenAI-compatible models)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   AI_DISABLED=false  # Set to true to disable AI features
   ```
4. Run the development server: `npm run dev`
5. Visit `/quote` to access the wizard

## Migration from Netlify Functions

This project has been migrated from Netlify Functions to Next.js API Routes for better performance, type safety, and deployment flexibility.

### Benefits of API Routes:

- **Standard REST API**: Familiar HTTP-based interface
- **Better Caching**: Built-in caching headers and CDN support
- **Simplified Deployment**: Works with any Next.js hosting platform
- **Better Error Handling**: Standard HTTP status codes and error responses
- **Flexible Integration**: Can be called from any client (web, mobile, third-party)

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `AI_DISABLED`: Set to "true" to disable all AI features (optional)

## Cost Optimization

The wizard is designed to keep costs minimal:

- Uses gpt-4o-mini for text generation (~£0.00015 per 1K tokens)
- Single DALL-E 3 image generation (~£0.04 per image)
- Strict token limits (max 300 output tokens)
- Input truncation and summarization
- Budget limits prevent expensive requests

## Project Structure

```
src/
├── app/
│   ├── quote/
│   │   ├── page.tsx                # Main quote wizard page
│   │   └── QuoteWizardClient.tsx   # Client component with state management
│   └── api/
│       └── generate/
│           └── route.ts            # API route for AI generation
├── components/
│   ├── Wizard.tsx                  # Main wizard component
│   └── CostNotice.tsx              # Cost information display
├── lib/
│   ├── openai.ts                   # OpenAI client with rate limiting
│   └── cost.ts                     # Cost estimation utilities
└── presets/                        # JSON data for wizard options
    ├── projectTypes.json
    ├── brandVibes.json
    ├── layouts.json
    ├── modules.json
    └── themes.json
```

## API Endpoints

- `POST /api/generate`: Generates concise requirement-aligned spec (no image)
- `POST /api/recommend`: Returns AI suggestions (layout, modules, theme, CTA, questions)

## Deployment

The project can be deployed to any platform that supports Next.js:

- **Vercel**: Recommended with automatic deployments
- **Netlify**: With Next.js plugin for optimal performance
- **Railway/Render**: For custom server deployments
- **Self-hosted**: With proper environment variable configuration

## License

MIT
