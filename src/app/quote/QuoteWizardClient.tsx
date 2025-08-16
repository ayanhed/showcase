"use client";

import RequirementsWizard from "@/components/RequirementsWizard";
import { Section, Heading, Text, Animate } from "@/components/ui";

export default function QuoteWizardClient() {
  return (
    <div id="quote">
      {/* Hero Section */}
      <Section>
        <Animate type="slideUp" duration={0.8} delay={0.2} once={true}>
          <div className="text-center mb-12">
            <Heading level={1} showDot className="mb-6">
              AI Requirements Wizard
            </Heading>
            <Text
              size="lg"
              variant="muted"
              align="center"
              className="max-w-3xl mx-auto"
            >
              Gather clear, high-level requirements with presets and friendly AI
              suggestions.
            </Text>
          </div>
        </Animate>

        <Animate type="slideUp" duration={0.8} delay={0.4} once={true}>
          <RequirementsWizard />
        </Animate>
      </Section>
    </div>
  );
}
