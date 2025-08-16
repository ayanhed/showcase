"use client";

import { useState, useEffect } from "react";
import {
  getCurrentModelInfo,
  listAvailableModels,
  getModelConfig,
  type ModelConfig,
} from "../lib/openai";

export default function ModelSwitcher() {
  const [currentModel, setCurrentModel] = useState<ModelConfig | null>(null);
  const [currentProfile, setCurrentProfile] = useState<string>("designer");
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("modelProfile")
        : null;
    const profile = stored || "designer";
    setCurrentProfile(profile);
    setCurrentModel(getModelConfig(profile) || getCurrentModelInfo());
    setAvailableModels(listAvailableModels());
  }, []);

  const handleModelSwitch = (profile: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("modelProfile", profile);
    }
    setCurrentProfile(profile);
    setCurrentModel(getModelConfig(profile) || getCurrentModelInfo());
  };

  if (!currentModel) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Model Configuration
        </h3>
        <span className="text-xs text-gray-500">Testing Mode</span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-xs">
          <span className="font-medium">Text:</span> {currentModel.textModel}
        </div>
        <div className="text-xs">
          <span className="font-medium">Max Tokens:</span>{" "}
          {currentModel.maxTokens}
        </div>
        <div className="text-xs">
          <span className="font-medium">Temperature:</span>{" "}
          {currentModel.temperature}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700">
          Switch Model:
        </label>
        <div className="flex flex-wrap gap-1">
          {availableModels.map((profile) => {
            const config = getModelConfig(profile);
            const isActive = profile === currentProfile;

            return (
              <button
                key={profile}
                onClick={() => handleModelSwitch(profile)}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  isActive
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
                title={`${config?.textModel}`}
              >
                {profile}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Set{" "}
          <code className="bg-gray-100 px-1 rounded">OPENAI_MODEL_PROFILE</code>{" "}
          env var for persistent config
        </div>
      </div>
    </div>
  );
}
