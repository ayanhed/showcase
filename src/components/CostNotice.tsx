'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';

export default function CostNotice() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-blue-900 mb-1">
            We keep costs tiny
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            Short prompts, streaming responses, and minified outputs ensure each generation costs less than £0.10.
          </p>
          
          {isExpanded && (
            <div className="text-xs text-blue-600 space-y-1 mt-2">
              <p>• Using gpt-4o-mini for text generation</p>
              <p>• DALL-E 3 for single image creation</p>
              <p>• Strict token limits and input truncation</p>
              <p>• No recursive calls or retries</p>
            </div>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            {isExpanded ? 'Show less' : 'Learn more'}
          </button>
        </div>
      </div>
    </div>
  );
}