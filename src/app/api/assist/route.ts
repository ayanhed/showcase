import { NextRequest, NextResponse } from "next/server";
import { getOpenAIInstance, type AssistInput } from "@/lib/openai";
import { truncateText, estimateTokens, estimateTotalCost } from "@/lib/cost";

/**
 * API endpoint for AI assistant suggestions in the requirements wizard.
 *
 * Provides contextual suggestions, clarifying questions, and warnings to help
 * non-technical users better describe their software project needs.
 *
 * @param request - Next.js request object containing the assistant input
 * @returns JSON response with suggestions, questions, or warnings
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/assist', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     step: 'goals',
 *     projectType: 'Website',
 *     description: 'A simple site to showcase my services',
 *     selections: ['Get customers']
 *   })
 * });
 * ```
 */
export async function POST(request: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "OpenRouter API key is not configured" },
      { status: 500 }
    );
  }

  // If AI is disabled, return empty assistant response to keep flow moving
  if (process.env.AI_DISABLED === "true") {
    return NextResponse.json({});
  }

  try {
    const body = await request.json();
    const input: AssistInput = {
      step: body.step,
      projectType: body.projectType || "Website",
      description: truncateText(body.description || "", 200),
      selections: Array.isArray(body.selections) ? body.selections : [],
    };

    const inputText = JSON.stringify(input);
    const tokens = estimateTokens(inputText);
    const estimatedCost = estimateTotalCost(tokens);
    if (estimatedCost >= 0.1) {
      return NextResponse.json(
        {
          error: "Request exceeds budget limit",
          estimatedCost: estimatedCost.toFixed(4),
        },
        { status: 400 }
      );
    }

    const result = await getOpenAIInstance().generateAssistantSuggestions(
      input
    );
    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, max-age=600" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // On failure, return empty suggestions per guardrail
    return NextResponse.json(
      { error: "Failed to get assistant suggestions", details: message },
      { status: 200 }
    );
  }
}
