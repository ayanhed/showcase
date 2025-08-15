import type { Metadata } from "next";
import { personalInfo } from "@/lib/data";
import QuoteWizardClient from "./QuoteWizardClient";

const title = "AI Quote Wizard";
const description = "Generate custom UI mocks for your project in minutes. AI-powered wizard with cost-optimized generation using OpenAI.";

export const metadata: Metadata = {
  title: `${title} - ${personalInfo.name}`,
  description,
  openGraph: {
    title: `${title} - ${personalInfo.name}`,
    description,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QuotePage() {
  return <QuoteWizardClient />;
}