import React from "react";
import { cn } from "@/lib/utils";

interface StoryAvatarRingProps {
  src: string;
  alt: string;
  size?: number; // px
  hasUnseen?: boolean;
  className?: string;
}

export default function StoryAvatarRing({
  src,
  alt,
  size = 64,
  hasUnseen = true,
  className,
}: StoryAvatarRingProps) {
  const border = hasUnseen
    ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
    : "bg-gray-500";

  const outer = Math.round(size + 8);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        className
      )}
      style={{ width: outer, height: outer }}
    >
      <div className={cn("absolute inset-0 rounded-full p-[3px]", border)}>
        <div className="w-full h-full rounded-full bg-black" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="rounded-full border-2 border-black object-cover"
        style={{ width: size, height: size }}
      />
    </div>
  );
}