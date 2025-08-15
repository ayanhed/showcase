'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, Upload, Download, Share2 } from 'lucide-react';
import CostNotice from './CostNotice';
import { type QuoteSpec } from '../lib/openai';

// Import preset data
import projectTypes from '../presets/projectTypes.json';
import brandVibes from '../presets/brandVibes.json';
import layouts from '../presets/layouts.json';
import modules from '../presets/modules.json';
import themes from '../presets/themes.json';

interface PresetItem {
  key: string;
  label: string;
  description: string;
}

interface WizardStep {
  title: string;
  key: string;
  data?: PresetItem[];
  multiSelect?: boolean;
  custom?: boolean;
}

interface WizardState {
  type: string;
  vibe: string;
  layout: string;
  modules: string[];
  theme: string;
  cta: string;
  customColors: string[];
  logo?: File;
}

interface WizardProps {
  onGenerate: (state: WizardState) => Promise<{ spec: QuoteSpec; imageUrl: string }>;
}

export default function Wizard({ onGenerate }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    type: '',
    vibe: '',
    layout: '',
    modules: [],
    theme: 'light',
    cta: '',
    customColors: ['#3b82f6', '#1f2937']
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ spec: QuoteSpec; imageUrl: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps: WizardStep[] = [
    { title: 'Project Type', key: 'type', data: projectTypes },
    { title: 'Brand Vibe', key: 'vibe', data: brandVibes },
    { title: 'Layout', key: 'layout', data: layouts },
    { title: 'Modules', key: 'modules', data: modules, multiSelect: true },
    { title: 'Theme', key: 'theme', data: themes },
    { title: 'CTA Text', key: 'cta', custom: true },
    { title: 'Assets', key: 'assets', custom: true }
  ];

  const updateState = useCallback((key: string, value: string | string[] | File) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await onGenerate(state);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!result?.imageUrl) return;
    
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `ui-mock-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (!result) return;
    
    const shareData = {
      spec: result.spec,
      timestamp: Date.now()
    };
    
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;
    
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    if (step.custom) {
      if (step.key === 'cta') {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call-to-Action Text (max 20 characters)
              </label>
              <input
                type="text"
                maxLength={20}
                value={state.cta}
                onChange={(e) => updateState('cta', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Get Started"
              />
              <p className="text-xs text-gray-500 mt-1">
                {state.cta.length}/20 characters
              </p>
            </div>
          </div>
        );
      }
      
      if (step.key === 'assets') {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Upload (optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size <= 250 * 1024) {
                      updateState('logo', file);
                    }
                  }}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500">Upload logo</span>
                  <span className="text-gray-500"> or drag and drop</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">Max 250KB, preview only</p>
              </div>
            </div>
            
            {state.theme === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Colors
                </label>
                <div className="flex gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Primary</label>
                    <input
                      type="color"
                      value={state.customColors[0]}
                      onChange={(e) => updateState('customColors', [e.target.value, state.customColors[1]])}
                      className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Secondary</label>
                    <input
                      type="color"
                      value={state.customColors[1]}
                      onChange={(e) => updateState('customColors', [state.customColors[0], e.target.value])}
                      className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {step.data?.map((item: PresetItem) => (
          <button
            key={item.key}
            onClick={() => {
              if (step.multiSelect) {
                const current = state[step.key as keyof WizardState] as string[];
                const newValue = current.includes(item.key)
                  ? current.filter(k => k !== item.key)
                  : [...current, item.key];
                updateState(step.key, newValue);
              } else {
                updateState(step.key, item.key);
              }
            }}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              step.multiSelect
                ? (state[step.key as keyof WizardState] as string[])?.includes(item.key)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                : state[step.key as keyof WizardState] === item.key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
              {step.multiSelect && (state[step.key as keyof WizardState] as string[])?.includes(item.key) && (
                <Check className="w-5 h-5 text-blue-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderPreview = () => {
    if (!state.type || !state.layout) return null;

    const previewColors = state.theme === 'custom' ? state.customColors : 
      state.theme === 'dark' ? ['#1f2937', '#f9fafb'] : ['#ffffff', '#1f2937'];

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Live Preview</h3>
        <div 
          className="w-full h-32 rounded border-2 border-dashed border-gray-300 flex items-center justify-center"
          style={{ backgroundColor: previewColors[0] }}
        >
          <div className="text-center">
            <div 
              className="text-lg font-medium mb-1"
              style={{ color: previewColors[1] }}
            >
              {state.cta || 'Sample Text'}
            </div>
            <div className="text-xs text-gray-500">
              {state.type} • {state.layout}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{result.spec.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.spec.modules.map(module => (
                <span key={module} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {module}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Share2 className="w-4 h-4" />
                Share Result
              </button>
              <button
                onClick={() => {
                  setResult(null);
                  setCurrentStep(0);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Start Over
              </button>
            </div>
          </div>
          <div className="p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={result.imageUrl} 
              alt="Generated UI Mock" 
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <CostNotice />
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {steps[currentStep].title}
          </h2>
          {renderStepContent()}
          {renderPreview()}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!state[steps[currentStep].key as keyof WizardState]}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !state.cta}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Mock'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}