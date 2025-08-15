'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { Card, Stack, Heading, Button } from './ui';
import Icon from './ui/Icon';

export default function CostNotice() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card variant="outlined" className="mb-6">
      <Stack direction="horizontal" spacing="md" align="start">
        <Icon icon={Info} className="text-accent-blue mt-1 flex-shrink-0" />
        <Stack spacing="sm" className="flex-1">
          <Heading level={6} className="mb-0 text-white">
            We keep costs tiny
          </Heading>
          <p className="text-sm text-gray-400">
            Short prompts, streaming responses, and minified outputs ensure each generation costs less than £0.10.
          </p>
          
          {isExpanded && (
            <Stack spacing="xs" className="text-xs text-gray-500">
              <p>• Using gpt-4o-mini for text generation</p>
              <p>• DALL-E 3 for single image creation</p>
              <p>• Strict token limits and input truncation</p>
              <p>• No recursive calls or retries</p>
            </Stack>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs self-start"
          >
            {isExpanded ? 'Show less' : 'Learn more'}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}