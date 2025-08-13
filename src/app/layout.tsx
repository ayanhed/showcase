import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { contactInfo, personalInfo } from "../lib/data";
import Footer from "../components/Footer";
import * as data from "@/lib/data";
import Providers from "./providers";
import DotGrid from "../components/ui/DotGrid";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistMono.variable} ${inter.variable} antialiased bg-gradient-to-b from-dark-bg via-dark-bg to-dark-card`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function () {
                console.log('Attempting to register service worker...');
                // Try with explicit scope
                navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .catch(function(err) {
                  console.log('First attempt failed, trying without scope...');
                  return navigator.serviceWorker.register('/sw.js');
                  })
                  .then(function(registration) {
                    console.log('ServiceWorker registration successful:', registration);
                    })
                    .catch(function (err) {
                      console.error('ServiceWorker registration failed:', err);
                      console.error('Error details:', err.message, err.stack);
                      });
                      });
                      }
                      `,
          }}
        />
        <Navigation />
        <div
          style={{ width: "100vw", height: "100vh", position: "fixed" }}
          className="bg-gradient-to-b -z-20 opacity-65"
          aria-hidden="true"
          role="presentation"
        >
          <DotGrid
            dotSize={2}
            gap={50}
            baseColor="#2a2a2a"
            activeColor={data.theme.primary}
            proximity={130}
            shockRadius={200}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        <main className="container mx-auto pt-10 min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Footer personalInfo={personalInfo} contactInfo={contactInfo} />
      </body>
    </html>
  );
}
