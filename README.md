# AI Quote Wizard

An AI-powered interactive quote wizard that generates custom UI mocks based on user preferences. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **7-Step Wizard**: Guided process for collecting project requirements
- **AI-Powered Generation**: Uses OpenAI's gpt-4o-mini and DALL-E 3 for text and image generation
- **Cost Optimized**: Strict token limits, streaming responses, and budget controls
- **Real-time Preview**: Live wireframe preview as you make selections
- **Share Results**: Generate shareable links with encoded specifications
- **Local Storage**: Caches recent generations for quick access

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Netlify Functions
- **AI**: OpenAI API (gpt-4o-mini + DALL-E 3)

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
├── app/quote/page.tsx          # Main quote wizard page
├── components/
│   ├── Wizard.tsx              # Main wizard component
│   └── CostNotice.tsx          # Cost information display
├── lib/
│   ├── openai.ts               # OpenAI client with rate limiting
│   └── cost.ts                 # Cost estimation utilities
└── presets/                    # JSON data for wizard options
    ├── projectTypes.json
    ├── brandVibes.json
    ├── layouts.json
    ├── modules.json
    └── themes.json

netlify/functions/
└── generate.ts                 # Netlify function for AI generation
```

## API Endpoints

- `POST /.netlify/functions/generate`: Generates quote spec and UI mock image

## Deployment

The project is configured for Netlify deployment with:
- Next.js plugin for optimal performance
- Edge functions for serverless API calls
- Automatic builds on git push

## License

MIT
