import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { contactInfo, personalInfo } from "../lib/data";
import Footer from "../components/Footer";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ayan Hedayati - Senior Full Stack Developer",
  description:
    "Senior Full-Stack Developer with 8+ years of experience in React, Node.js, TypeScript, Azure, and full-cycle software delivery.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Azure",
    "Next.js",
    "Freelance",
  ],
  authors: [{ name: "Ayan Hedayati" }],
  openGraph: {
    title: "Ayan Hedayati - Senior Full Stack Developer",
    description:
      "Senior Full-Stack Developer with 8+ years of experience in React, Node.js, TypeScript, Azure, and full-cycle software delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistMono.variable} antialiased bg-gradient-to-b from-dark-bg via-dark-bg to-dark-card`}
      >
        <Navigation />
        <main className="container mx-auto pt-10 min-h-screen">{children}</main>
        <Footer personalInfo={personalInfo} contactInfo={contactInfo} />
      </body>
    </html>
  );
}
