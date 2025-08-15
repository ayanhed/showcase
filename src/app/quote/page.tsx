'use client';

import { useState, useEffect } from 'react';
import Wizard from '../../components/Wizard';
import { type QuoteSpec } from '../../lib/openai';

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

export default function QuotePage() {
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Quote Wizard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate custom UI mocks for your project in minutes. Choose your preferences and get a professional mockup instantly.
          </p>
        </div>

        <Wizard onGenerate={handleGenerate} />

        {/* Recent Specs */}
        {recentSpecs.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Generations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSpecs.map((spec, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{spec.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {spec.modules.slice(0, 3).map(module => (
                      <span key={module} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {module}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: spec.palette[0] }}
                    />
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: spec.palette[1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}