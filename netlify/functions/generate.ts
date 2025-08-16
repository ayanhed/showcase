import { NextRequest } from 'next/server';
import { openai, type WizardInput, type QuoteSpec } from '../../src/lib/openai';
import { checkBudget, truncateText } from '../../src/lib/cost';

export default async function handler(req: NextRequest) {
  // Kill switch check
  if (process.env.AI_DISABLED === 'true') {
    return new Response(JSON.stringify({ 
      error: 'AI generation is currently disabled' 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const input: WizardInput = {
      type: body.type || 'website',
      vibe: body.vibe || 'minimal',
      layout: body.layout || 'hero_features_cta',
      modules: Array.isArray(body.modules) ? body.modules : [],
      theme: body.theme || 'light',
      cta: truncateText(body.cta || 'Get Started', 20),
      brand: body.brand
    };

    // Budget check
    const inputText = JSON.stringify(input);
    const { withinBudget, estimatedCost } = checkBudget(inputText);
    
    if (!withinBudget) {
      return new Response(JSON.stringify({ 
        error: 'Request exceeds budget limit',
        estimatedCost: estimatedCost.toFixed(4)
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Generating quote spec...');
    const spec: QuoteSpec = await openai.generateQuoteSpec(input);
    
    console.log('Generating image...');
    const imageUrl = await openai.generateImage(spec);

    // Log usage for observability
    const inputTokens = Math.ceil(inputText.length / 4);
    console.log(`Generation complete - Input tokens: ${inputTokens}, Estimated cost: £${estimatedCost.toFixed(4)}`);

    return new Response(JSON.stringify({
      spec,
      imageUrl,
      usage: {
        inputTokens,
        estimatedCost: estimatedCost.toFixed(4)
      }
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Generation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(JSON.stringify({ 
      error: 'Failed to generate quote',
      details: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}