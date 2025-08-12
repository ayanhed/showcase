"use client";

import PushNotificationManager from "@/components/PushNotificationManager";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PushNotificationManager />
    </>
  );
}
