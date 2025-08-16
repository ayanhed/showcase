'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, Upload, Download, Share2 } from 'lucide-react';
import CostNotice from './CostNotice';
import { type QuoteSpec } from '../lib/openai';
import { quoteWizardConfig } from '../lib/data';
import { Card, Stack, Heading, Button, Input, Badge, Grid } from './ui';
import Icon from './ui/Icon';

interface PresetItem {
  readonly key: string;
  readonly label: string;
  readonly description: string;
}

interface WizardStep {
  title: string;
  key: string;
  data?: readonly PresetItem[];
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
    { title: 'Project Type', key: 'type', data: quoteWizardConfig.projectTypes },
    { title: 'Brand Vibe', key: 'vibe', data: quoteWizardConfig.brandVibes },
    { title: 'Layout', key: 'layout', data: quoteWizardConfig.layouts },
    { title: 'Modules', key: 'modules', data: quoteWizardConfig.modules, multiSelect: true },
    { title: 'Theme', key: 'theme', data: quoteWizardConfig.themes },
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
          <Stack spacing="md">
            <Input
              label="Call-to-Action Text (max 20 characters)"
              type="text"
              maxLength={20}
              value={state.cta}
              onChange={(e) => updateState('cta', e.target.value)}
              placeholder="Get Started"
              helperText={`${state.cta.length}/20 characters`}
            />
          </Stack>
        );
      }
      
      if (step.key === 'assets') {
        return (
          <Stack spacing="lg">
            <Stack spacing="sm">
              <Heading level={6} className="mb-0 text-white">
                Logo Upload (optional)
              </Heading>
              <Card variant="outlined" className="text-center">
                <Stack spacing="md" align="center">
                  <Icon icon={Upload} size="2xl" className="text-gray-400" />
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
                    <span className="text-accent-blue hover:text-blue-400">Upload logo</span>
                    <span className="text-gray-400"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-500">Max 250KB, preview only</p>
                </Stack>
              </Card>
            </Stack>
            
            {state.theme === 'custom' && (
              <Stack spacing="sm">
                <Heading level={6} className="mb-0 text-white">
                  Brand Colors
                </Heading>
                <Stack direction="horizontal" spacing="lg">
                  <Stack spacing="xs" align="center">
                    <label className="block text-xs text-gray-400">Primary</label>
                    <input
                      type="color"
                      value={state.customColors[0]}
                      onChange={(e) => updateState('customColors', [e.target.value, state.customColors[1]])}
                      className="w-12 h-12 border border-gray-600 rounded cursor-pointer bg-gray-800"
                    />
                  </Stack>
                  <Stack spacing="xs" align="center">
                    <label className="block text-xs text-gray-400">Secondary</label>
                    <input
                      type="color"
                      value={state.customColors[1]}
                      onChange={(e) => updateState('customColors', [state.customColors[0], e.target.value])}
                      className="w-12 h-12 border border-gray-600 rounded cursor-pointer bg-gray-800"
                    />
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Stack>
        );
      }
    }

    return (
      <Grid cols={3} gap="md" responsive={true}>
        {step.data?.map((item: PresetItem) => {
          const isSelected = step.multiSelect
            ? (state[step.key as keyof WizardState] as string[])?.includes(item.key)
            : state[step.key as keyof WizardState] === item.key;

          return (
            <Card
              key={item.key}
              variant={isSelected ? "default" : "outlined"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                isSelected ? 'border-accent-blue bg-gray-800' : 'hover:border-gray-500'
              }`}
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
            >
              <Stack direction="horizontal" justify="between" align="start">
                <Stack spacing="xs" className="flex-1">
                  <Heading level={6} className="mb-0 text-white">{item.label}</Heading>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </Stack>
                {step.multiSelect && isSelected && (
                  <Icon icon={Check} className="text-accent-blue flex-shrink-0" />
                )}
              </Stack>
            </Card>
          );
        })}
      </Grid>
    );
  };

  const renderPreview = () => {
    if (!state.type || !state.layout) return null;

    const previewColors = state.theme === 'custom' ? state.customColors : 
      state.theme === 'dark' ? ['#1f2937', '#f9fafb'] : ['#ffffff', '#1f2937'];

    return (
      <Card variant="outlined" className="mt-6">
        <Stack spacing="sm">
          <Heading level={6} className="mb-0 text-white">Live Preview</Heading>
          <div 
            className="w-full h-32 rounded border-2 border-dashed border-gray-600 flex items-center justify-center"
            style={{ backgroundColor: previewColors[0] }}
          >
            <Stack spacing="xs" align="center">
              <div 
                className="text-lg font-medium"
                style={{ color: previewColors[1] }}
              >
                {state.cta || 'Sample Text'}
              </div>
              <div className="text-xs text-gray-500">
                {state.type} • {state.layout}
              </div>
            </Stack>
          </div>
        </Stack>
      </Card>
    );
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card variant="dark" className="overflow-hidden">
          <Stack spacing="lg">
            <Stack spacing="md">
              <Heading level={3} className="mb-0">{result.spec.title}</Heading>
              <Stack direction="horizontal" spacing="sm" wrap>
                {result.spec.modules.map(module => (
                  <Badge key={module} variant="primary">
                    {module}
                  </Badge>
                ))}
              </Stack>
              <Stack direction="horizontal" spacing="md" wrap>
                <Button
                  icon={Download}
                  onClick={handleDownload}
                  variant="primary"
                >
                  Download PNG
                </Button>
                <Button
                  icon={Share2}
                  onClick={handleShare}
                  variant="secondary"
                >
                  Share Result
                </Button>
                <Button
                  onClick={() => {
                    setResult(null);
                    setCurrentStep(0);
                  }}
                  variant="ghost"
                >
                  Start Over
                </Button>
              </Stack>
            </Stack>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={result.imageUrl} 
                alt="Generated UI Mock" 
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </Stack>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <CostNotice />
      
      <Card variant="dark">
        <Stack spacing="lg">
          {/* Progress */}
          <Stack direction="horizontal" justify="between" align="center">
            <Stack direction="horizontal" spacing="sm" align="center">
              {steps.map((step, index) => (
                <Stack key={step.key} direction="horizontal" align="center" spacing="sm">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-accent-blue text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {index < currentStep ? <Icon icon={Check} size="sm" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-700'
                    }`} />
                  )}
                </Stack>
              ))}
            </Stack>
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
          </Stack>

          {/* Step Content */}
          <Stack spacing="lg">
            <Heading level={4} className="mb-0">
              {steps[currentStep].title}
            </Heading>
            {renderStepContent()}
            {renderPreview()}
          </Stack>

          {/* Error */}
          {error && (
            <Card variant="outlined" className="border-red-500 bg-red-900/20">
              <p className="text-red-400">{error}</p>
            </Card>
          )}

          {/* Navigation */}
          <Stack direction="horizontal" justify="between">
            <Button
              icon={ChevronLeft}
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="ghost"
            >
              Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                icon={ChevronRight}
                iconPosition="right"
                onClick={handleNext}
                disabled={!state[steps[currentStep].key as keyof WizardState]}
                variant="primary"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !state.cta}
                variant="primary"
              >
                {isGenerating ? 'Generating...' : 'Generate Mock'}
              </Button>
            )}
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}