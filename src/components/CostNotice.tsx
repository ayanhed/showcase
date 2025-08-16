"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { Card, Stack, Heading, Button } from "./ui";
import Icon from "./ui/Icon";
import { getCurrentModelInfo } from "../lib/openai";

export default function CostNotice() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>("gpt-4o-mini");
  // image model removed

  useEffect(() => {
    const config = getCurrentModelInfo();
    setCurrentModel(config.textModel);
  }, []);

  return (
    <Card variant="outlined" className="mb-6">
      <Stack direction="horizontal" spacing="md" align="start">
        <Icon icon={Info} className="text-accent-blue mt-1 flex-shrink-0" />
        <Stack spacing="sm" className="flex-1">
          <Heading level={6} className="mb-0 text-white">
            We keep costs tiny
          </Heading>
          <p className="text-sm text-gray-400">
            Short prompts and minified outputs ensure each run costs less than
            £0.10.
          </p>

          {isExpanded && (
            <Stack spacing="xs" className="text-xs text-gray-500">
              <p>• Using {currentModel} for text generation</p>
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
            {isExpanded ? "Show less" : "Learn more"}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
