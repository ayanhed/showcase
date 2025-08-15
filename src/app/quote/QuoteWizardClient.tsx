'use client';

import { useState, useEffect } from 'react';
import Wizard from '../../components/Wizard';
import { type QuoteSpec } from '../../lib/openai';
import { Section, Heading, Text, Animate, Card, Stack, Badge, Grid } from '@/components/ui';

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

export default function QuoteWizardClient() {
  const [recentSpecs, setRecentSpecs] = useState<QuoteSpec[]>([]);

  useEffect(() => {
    // Load recent specs from localStorage
    const saved = localStorage.getItem('recentSpecs');
    if (saved) {
      try {
        setRecentSpecs(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load recent specs:', error);
      }
    }

    // Check for shared spec in URL
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    if (shareParam) {
      try {
        const decoded = JSON.parse(atob(shareParam));
        if (decoded.spec) {
          // You could auto-load the shared spec here
          console.log('Shared spec:', decoded.spec);
        }
      } catch (error) {
        console.error('Failed to decode shared spec:', error);
      }
    }
  }, []);

  const handleGenerate = async (state: WizardState): Promise<{ spec: QuoteSpec; imageUrl: string }> => {
    const response = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: state.type,
        vibe: state.vibe,
        layout: state.layout,
        modules: state.modules,
        theme: state.theme,
        cta: state.cta,
        brand: state.theme === 'custom' ? `${state.customColors[0]} + ${state.customColors[1]}` : undefined
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Generation failed');
    }

    const result = await response.json();
    
    // Save to recent specs
    const updatedSpecs = [result.spec, ...recentSpecs.slice(0, 4)];
    setRecentSpecs(updatedSpecs);
    localStorage.setItem('recentSpecs', JSON.stringify(updatedSpecs));

    return result;
  };

  return (
    <div id="quote">
      {/* Hero Section */}
      <Section>
        <Animate type="slideUp" duration={0.8} delay={0.2} once={true}>
          <div className="text-center mb-12">
            <Heading level={1} showDot className="mb-6">
              AI Quote Wizard
            </Heading>
            <Text size="lg" variant="muted" align="center" className="max-w-3xl mx-auto">
              Generate custom UI mocks for your project in minutes. Choose your preferences and get a professional mockup instantly with AI-powered generation that keeps costs minimal.
            </Text>
          </div>
        </Animate>

        <Animate type="slideUp" duration={0.8} delay={0.4} once={true}>
          <Wizard onGenerate={handleGenerate} />
        </Animate>
      </Section>

      {/* Recent Specs Section */}
      {recentSpecs.length > 0 && (
        <Section>
          <Animate type="slideUp" duration={0.8} delay={0.6} once={true}>
            <Stack spacing="xl">
              <div className="text-center">
                <Heading level={2} showDot>
                  Recent Generations
                </Heading>
                <Text size="lg" variant="muted" align="center" className="max-w-2xl mx-auto">
                  Your recently generated UI mocks are cached locally for quick access.
                </Text>
              </div>
              
              <Grid cols={3} gap="md" responsive={true}>
                {recentSpecs.map((spec, index) => (
                  <Animate
                    key={index}
                    type="slideUp"
                    duration={0.8}
                    delay={index * 0.1}
                    once={true}
                  >
                    <Card variant="outlined" className="hover:border-accent-blue transition-colors">
                      <Stack spacing="md">
                        <Heading level={6} className="mb-0 text-white">
                          {spec.title}
                        </Heading>
                        
                        <Stack direction="horizontal" spacing="xs" wrap>
                          {spec.modules.slice(0, 3).map(module => (
                            <Badge key={module} variant="secondary">
                              {module}
                            </Badge>
                          ))}
                          {spec.modules.length > 3 && (
                            <Badge variant="secondary">
                              +{spec.modules.length - 3}
                            </Badge>
                          )}
                        </Stack>
                        
                        <Stack direction="horizontal" spacing="xs">
                          {spec.palette.map((color, colorIndex) => (
                            <div 
                              key={colorIndex}
                              className="w-4 h-4 rounded border border-gray-600"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </Stack>
                      </Stack>
                    </Card>
                  </Animate>
                ))}
              </Grid>
            </Stack>
          </Animate>
        </Section>
      )}
    </div>
  );
}