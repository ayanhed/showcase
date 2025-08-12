"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" } | undefined>;
};

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault?.();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };
    (
      window as unknown as {
        addEventListener: (type: string, cb: (e: Event) => void) => void;
      }
    ).addEventListener("beforeinstallprompt", handler);
    // Detect iOS (Safari & standalone not already installed)
    const ua = typeof window !== "undefined" ? window.navigator.userAgent : "";
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" &&
        (navigator as unknown as { maxTouchPoints?: number }).maxTouchPoints! >
          1);
    const isStandalone =
      (window.navigator as unknown as { standalone?: boolean }).standalone ||
      window.matchMedia("(display-mode: standalone)").matches;
    const dismissed =
      typeof window !== "undefined"
        ? window.localStorage.getItem("pwa-ios-dismissed") === "1"
        : true;
    if (isIOS && !isStandalone && !dismissed) {
      setShowIOSHint(true);
    }
    return () => {
      (
        window as unknown as {
          removeEventListener: (type: string, cb: (e: Event) => void) => void;
        }
      ).removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (!isVisible && !showIOSHint) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-xl p-4">
      <div className="dark-card p-4 flex items-center justify-between gap-3 shadow-lg">
        {showIOSHint ? (
          <div>
            <p className="font-semibold">Install on iOS</p>
            <p className="text-sm text-gray-400">
              Tap the Share icon, then “Add to Home Screen”.
            </p>
          </div>
        ) : (
          <div>
            <p className="font-semibold">Install this app</p>
            <p className="text-sm text-gray-400">
              Add to your home screen for a better experience.
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <button
            className="btn-secondary"
            onClick={() => {
              setIsVisible(false);
              setDeferredPrompt(null);
              if (showIOSHint) {
                try {
                  window.localStorage.setItem("pwa-ios-dismissed", "1");
                } catch {}
                setShowIOSHint(false);
              }
            }}
          >
            Not now
          </button>
          {!showIOSHint && (
            <button
              className="btn-primary"
              onClick={async () => {
                if (!deferredPrompt) return;
                await deferredPrompt.prompt();
                await deferredPrompt.userChoice?.catch(() => undefined);
                setIsVisible(false);
                setDeferredPrompt(null);
              }}
            >
              Install
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
