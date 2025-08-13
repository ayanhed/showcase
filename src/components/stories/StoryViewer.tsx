"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export type StoryItem = {
  id: string;
  type: "image" | "video" | "text";
  src?: string; // for image/video
  text?: string; // for text stories
  background?: string; // bg for text story
  durationMs?: number; // for image/text, default 5000
  cta?: { label: string; href: string };
  postedAt?: string;
};

interface StoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  stories: ReadonlyArray<StoryItem>;
  author?: { name: string; avatar: string };
  initialIndex?: number;
}

const DEFAULT_DURATION = 5000;

export default function StoryViewer({
  isOpen,
  onClose,
  stories,
  author = { name: personalInfo.name, avatar: personalInfo.profileImage },
  initialIndex = 0,
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [, force] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0); // 0..1 for current story

  const current = stories[currentIndex];

  const canShow = isOpen && stories.length > 0;

  // Handle entry animation
  useEffect(() => {
    if (canShow) {
      setIsVisible(true);
      setIsExiting(false);
    } else {
      setIsVisible(false);
    }
  }, [canShow]);

  // Handle exit animation
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 300); // Match animation duration
  }, [onClose]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    resetTimer();
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleClose();
    }
  }, [currentIndex, stories.length, handleClose, resetTimer]);

  const goPrev = useCallback(() => {
    resetTimer();
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex, resetTimer]);

  // Keyboard nav
  useEffect(() => {
    if (!canShow) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [canShow, handleClose, goNext, goPrev]);

  // Manage timers/progress for image/text
  useEffect(() => {
    if (!canShow) return;
    progressRef.current = 0;

    // For videos, progress handled via timeupdate
    if (current?.type === "video") {
      return;
    }

    const duration = current?.durationMs ?? DEFAULT_DURATION;
    const start = performance.now();

    const tick = () => {
      if (isPaused) return;
      const elapsed = performance.now() - start;
      progressRef.current = Math.min(1, elapsed / duration);
      force((n) => (n + 1) % 1000);
      if (progressRef.current >= 1) {
        goNext();
      }
    };

    // 60fps approx
    timerRef.current = window.setInterval(tick, 16);

    return () => {
      resetTimer();
    };
  }, [
    canShow,
    current?.type,
    current?.durationMs,
    goNext,
    isPaused,
    resetTimer,
  ]);

  // Pause/resume helpers
  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  // Video progress binding
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && !isPaused) {
      progressRef.current = Math.min(1, video.currentTime / video.duration);
      force((n) => (n + 1) % 1000);
    }
  }, [isPaused]);

  const handleVideoEnded = useCallback(() => {
    goNext();
  }, [goNext]);

  // Reset video ref when story changes
  useEffect(() => {
    if (current?.type === "video") {
      // Autoplay when ready
      requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
    } else {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
      }
    }
  }, [current?.type]);

  const handleTapZone = useCallback(
    (dir: "left" | "right") => {
      if (dir === "left") {
        if (current?.type === "video") {
          try {
            videoRef.current?.pause();
          } catch {}
        }
        goPrev();
      } else {
        if (current?.type === "video") {
          try {
            videoRef.current?.pause();
          } catch {}
        }
        goNext();
      }
    },
    [current?.type, goNext, goPrev]
  );

  // Compute progress widths for segments
  const segments = useMemo(() => {
    return stories.map((_, idx) => {
      if (idx < currentIndex) return 1;
      if (idx > currentIndex) return 0;
      return progressRef.current;
    });
  }, [stories, currentIndex]);

  // Don't render if not open and not exiting
  if (!isOpen && !isExiting) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "transition-opacity duration-300 ease-out",
        isVisible && !isExiting ? "opacity-100" : "opacity-0"
      )}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm md:block hidden"
        onClick={handleClose}
      />

      {/* Viewer frame */}
      <div
        className={cn(
          "relative z-10 w-full bg-black overflow-hidden",
          // Mobile: full screen with dynamic viewport height
          "h-[100dvh]",
          // Desktop: rounded modal
          "md:max-w-[420px] md:h-[80vh] md:max-h-[820px] md:rounded-xl md:border md:border-white/10 md:shadow-2xl",
          // Entry/Exit animations
          "transition-all duration-300 ease-out",
          isVisible && !isExiting
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        )}
        onMouseDown={pause}
        onMouseUp={resume}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {/* Progress bars */}
        <div className="absolute top-3 md:top-3 left-3 right-3 z-20 flex gap-1 pt-safe-top md:pt-0">
          {segments.map((p, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white rounded-full transition-[width] duration-150"
                style={{ width: `${Math.max(0, Math.min(1, p)) * 100}%` }}
              />
            </div>
          ))}
        </div>

        {/* Header: avatar + name + close */}
        <div className="absolute top-6 md:top-6 left-3 right-3 z-20 flex items-center justify-between pt-safe-top md:pt-0">
          <div className="flex items-center gap-3">
            <Image
              src={author.avatar}
              alt={author.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border border-white/20 object-cover"
            />
            <div className="text-white text-sm font-semibold drop-shadow-sm">
              {author.name}
            </div>
          </div>
          <button
            aria-label="Close"
            className="text-white/90 hover:text-white"
            onClick={handleClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="w-full h-full flex items-center justify-center bg-black">
          {current?.type === "image" && current.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.src}
              alt="story"
              className="w-full h-full object-contain"
              draggable={false}
            />
          )}

          {current?.type === "video" && current.src && (
            <video
              ref={videoRef}
              src={current.src}
              className="w-full h-full object-contain"
              playsInline
              muted={true}
              controls={false}
              preload="metadata"
              crossOrigin="anonymous"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onPlay={() => setIsPaused(false)}
              onPause={() => setIsPaused(true)}
              autoPlay
            />
          )}

          {current?.type === "text" && (
            <div
              className={cn(
                "w-full h-full flex items-center justify-center p-8",
                current.background ?? "bg-gradient-to-br from-gray-900 to-black"
              )}
            >
              <p className="text-white text-2xl leading-relaxed text-center whitespace-pre-wrap">
                {current.text}
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        {current?.cta && (
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center z-20 pb-safe-bottom">
            <Button as="a" href={current.cta.href} variant="primary" size="md">
              {current.cta.label}
            </Button>
          </div>
        )}

        {/* Tap zones */}
        <button
          aria-label="Previous"
          className="absolute inset-y-0 left-0 w-1/2 z-30 cursor-pointer focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            handleTapZone("left");
          }}
        />
        <button
          aria-label="Next"
          className="absolute inset-y-0 right-0 w-1/2 z-30 cursor-pointer focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            handleTapZone("right");
          }}
        />

        {/* Optional visual chevrons for desktop hover */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-10">
          <div className="hidden md:block text-white/50">
            <ChevronLeft className="w-7 h-7" />
          </div>
          <div className="hidden md:block text-white/50">
            <ChevronRight className="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
}
