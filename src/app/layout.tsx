import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { contactInfo, personalInfo } from "../lib/data";
import Footer from "../components/Footer";
import * as data from "@/lib/data";
import Providers from "./providers";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const title = `${data.personalInfo.name} - ${data.personalInfo.title}`;

export const metadata: Metadata = {
  title: title,
  description: data.personalInfo.about,
  keywords: [
    "Full Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Azure",
    "Next.js",
    "Freelance",
  ],
  authors: [{ name: data.personalInfo.name }],
  openGraph: {
    title: title,
    description: data.personalInfo.about,
    type: "website",
  },
  applicationName: data.personalInfo.shortAppName,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: title,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-touch-fullscreen": "yes",
  } as Record<string, string>,
};

export const viewport: Viewport = {
  themeColor: data.theme.background,
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js').catch(function (err) {
                  console.error('ServiceWorker registration failed:', err);
                });
              });
            }
          `,
          }}
        />
        <Navigation />
        <main className="container mx-auto pt-10 min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Footer personalInfo={personalInfo} contactInfo={contactInfo} />
      </body>
    </html>
  );
}
