import type { Metadata } from "next";
import { personalInfo } from "@/lib/data";
import QuoteWizardClient from "./QuoteWizardClient";

const title = "AI Requirements Wizard";
const description =
  "Gather clear, high-level project requirements in minutes. Friendly wizard with AI suggestions and cost-optimized generation.";

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
