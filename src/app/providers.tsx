"use client";

import InstallPrompt from "@/components/InstallPrompt";
import PushNotificationManager from "@/components/PushNotificationManager";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PushNotificationManager />
      <InstallPrompt />
    </>
  );
}
