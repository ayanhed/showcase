// Rough token estimation (4 chars ≈ 1 token)
export const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};

// Cost estimation for mini models (approximate)
const COST_PER_1K_TOKENS = 0.00015; // gpt-4o-mini pricing
const IMAGE_COST = 0.04; // DALL-E 3 1024x768

export const estimateCost = (inputTokens: number, outputTokens: number): number => {
  const totalTokens = inputTokens + outputTokens;
  return (totalTokens / 1000) * COST_PER_1K_TOKENS;
};

export const estimateTotalCost = (textTokens: number, imageGenerated: boolean = false): number => {
  const textCost = estimateCost(textTokens, 300); // Max output tokens
  const imageCost = imageGenerated ? IMAGE_COST : 0;
  return textCost + imageCost;
};

// Budget checks
export const checkBudget = (inputText: string): { withinBudget: boolean; estimatedCost: number } => {
  const inputTokens = estimateTokens(inputText);
  const estimatedCost = estimateTotalCost(inputTokens, true);
  
  // Budget limit: £0.10 per generation
  const withinBudget = estimatedCost < 0.10;
  
  return { withinBudget, estimatedCost };
};

// Text truncation utilities
export const truncateText = (text: string, maxChars: number = 200): string => {
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars - 3) + '...';
};

export const summarizeText = (text: string, maxChars: number = 800): string => {
  if (text.length <= maxChars) return text;
  
  // Simple summarization: take first sentence + key words
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const firstSentence = sentences[0]?.trim() || '';
  
  if (firstSentence.length >= maxChars) {
    return truncateText(firstSentence, maxChars);
  }
  
  // Add key words if space allows
  const remainingChars = maxChars - firstSentence.length - 10;
  if (remainingChars > 20) {
    const words = text.split(/\s+/).filter(w => w.length > 3);
    const keyWords = words.slice(0, 5).join(' ');
    return `${firstSentence}. Keywords: ${truncateText(keyWords, remainingChars)}`;
  }
  
  return firstSentence;
};