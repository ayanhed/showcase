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
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export interface StoryItem {
  readonly id: string;
  readonly type: "image" | "text";
  readonly src?: string;
  readonly text?: string;
  readonly background?: string;
  readonly durationMs?: number;
  readonly cta?: {
    readonly label: string;
    readonly href: string;
  };
  readonly postedAt?: string;
}

export interface StoryAuthor {
  readonly name: string;
  readonly avatar: string;
}

interface StoryViewerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly stories: ReadonlyArray<StoryItem>;
  readonly author?: StoryAuthor;
  readonly initialIndex?: number;
}

const DEFAULT_DURATION = 5000;
const PROGRESS_UPDATE_INTERVAL = 16; // ~60fps

// Helper functions
const getDefaultAuthor = (): StoryAuthor => ({
  name: personalInfo.name,
  avatar: personalInfo.profileImage,
});

const clampProgress = (progress: number): number =>
  Math.max(0, Math.min(1, progress));

const hasCallToAction = (story: StoryItem): boolean =>
  Boolean(story.cta?.label && story.cta?.href);

export default function StoryViewer({
  isOpen,
  onClose,
  stories,
  author = getDefaultAuthor(),
  initialIndex = 0,
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [progressTrigger, setProgressTrigger] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);

  // Memoized values
  const currentStory = useMemo(
    () => stories[currentIndex],
    [stories, currentIndex]
  );
  const canShow = useMemo(
    () => isOpen && stories.length > 0,
    [isOpen, stories.length]
  );
  const isLastStory = useMemo(
    () => currentIndex >= stories.length - 1,
    [currentIndex, stories.length]
  );
  const isFirstStory = useMemo(() => currentIndex <= 0, [currentIndex]);

  // Handle entry animation
  useEffect(() => {
    if (canShow) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [canShow]);

  // Timer management
  const resetTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Handle close
  const handleClose = useCallback(() => {
    resetTimer();
    onClose();
  }, [onClose, resetTimer]);

  const goNext = useCallback(() => {
    resetTimer();
    if (isLastStory) {
      handleClose();
    } else {
      // Reset progress immediately before changing story
      progressRef.current = 0;
      setProgressTrigger((prev) => (prev + 1) % 1000);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [isLastStory, handleClose, resetTimer]);

  const goPrev = useCallback(() => {
    resetTimer();
    if (!isFirstStory) {
      // Reset progress immediately before changing story
      progressRef.current = 0;
      setProgressTrigger((prev) => (prev + 1) % 1000);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [isFirstStory, resetTimer]);

  // Keyboard navigation
  useEffect(() => {
    if (!canShow) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          // Instantly complete current and advance
          progressRef.current = 1;
          setProgressTrigger((prev) => (prev + 1) % 1000);
          goNext();
          break;
        case "ArrowLeft":
          event.preventDefault();
          goPrev();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canShow, goNext, goPrev, currentStory]);

  // Progress management for stories
  useEffect(() => {
    if (!canShow || !currentStory) return;
    progressRef.current = 0;

    const duration = currentStory.durationMs ?? DEFAULT_DURATION;
    const startTime = performance.now();
    const updateProgress = () => {
      if (isPaused) return;
      const elapsed = performance.now() - startTime;
      const newProgress = elapsed / duration;
      progressRef.current = clampProgress(newProgress);
      setProgressTrigger((prev) => (prev + 1) % 1000);
      if (progressRef.current >= 1) {
        goNext();
      }
    };
    timerRef.current = window.setInterval(
      updateProgress,
      PROGRESS_UPDATE_INTERVAL
    );
    return resetTimer;
  }, [canShow, currentStory, goNext, isPaused, resetTimer]);

  // Pause/resume helpers
  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  const handleTapZone = useCallback(
    (direction: "left" | "right") => {
      if (direction === "left") {
        goPrev();
      } else {
        // Instantly fill current, then advance
        progressRef.current = 1;
        setProgressTrigger((prev) => (prev + 1) % 1000);
        goNext();
      }
    },
    [goNext, goPrev]
  );

  // Compute progress for each story segment
  const progressSegments = useMemo(() => {
    return stories.map((_, index) => {
      if (index < currentIndex) return 1; // Completed stories
      if (index > currentIndex) return 0; // Future stories
      return progressRef.current; // Current story progress
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stories, currentIndex, progressTrigger]); // progressTrigger needed to force updates

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-40 bg-black/80 backdrop-blur-sm",
            "transition-opacity duration-300 ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed z-50 w-full bg-black overflow-hidden",
            // Mobile: full screen with dynamic viewport height
            "h-[100dvh] top-0 left-0",
            // Desktop: rounded modal
            "md:max-w-[420px] md:h-[80vh] md:max-h-[820px] md:rounded-xl md:border md:border-white/10 md:shadow-2xl md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            // Entry/Exit animations
            "transition-all duration-300 ease-out",
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2"
          )}
          onMouseDown={pause}
          onMouseUp={resume}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onEscapeKeyDown={handleClose}
          onPointerDownOutside={handleClose}
        >
          {/* Dialog Title for accessibility */}
          <VisuallyHidden>
            <Dialog.Title>
              Story Viewer - {currentStory?.type === "image" ? "Image" : "Text"}{" "}
              Story {currentIndex + 1} of {stories.length}
            </Dialog.Title>
          </VisuallyHidden>

          {/* Progress bars */}
          <div
            className="absolute top-3 md:top-3 left-3 right-3 z-[10000] flex gap-1 pt-safe-top md:pt-0"
            role="progressbar"
            aria-label={`Story ${currentIndex + 1} of ${stories.length}`}
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={stories.length}
          >
            {progressSegments.map((progress, index) => (
              <div
                key={`progress-${stories[index]?.id || index}`}
                className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${clampProgress(progress) * 100}%` }}
                />
              </div>
            ))}
          </div>

          {/* Header: avatar + name + close */}
          <div className="absolute top-6 md:top-6 left-3 right-3 z-[10000] flex items-center justify-between pt-safe-top md:pt-0">
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
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="text-white/90 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="w-full h-full flex items-center justify-center bg-black">
            {currentStory?.type === "image" && currentStory.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentStory.src}
                alt={`Story image ${currentIndex + 1}`}
                className="w-full h-full object-contain"
                draggable={false}
              />
            )}

            {currentStory?.type === "text" && (
              <div
                className={cn(
                  "w-full h-full flex items-center justify-center p-8",
                  currentStory.background ??
                    "bg-gradient-to-br from-gray-900 to-black"
                )}
              >
                <p
                  className="text-white text-2xl leading-relaxed text-center whitespace-pre-wrap"
                  aria-label={`Story text: ${currentStory.text}`}
                >
                  {currentStory.text}
                </p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          {hasCallToAction(currentStory) && currentStory.cta && (
            <div className="absolute bottom-7 md:bottom-10 left-0 right-0 flex justify-center pb-safe-bottom">
              <Button
                as="a"
                href={currentStory.cta.href}
                variant="primary"
                size="md"
                aria-label={`${currentStory.cta.label} - Opens in new tab`}
              >
                {currentStory.cta.label}
              </Button>
            </div>
          )}

          {/* Tap zones for navigation */}
          <button
            type="button"
            aria-label={`Previous story${isFirstStory ? " (disabled)" : ""}`}
            className={cn(
              "absolute user-select-none left-0 w-1/2 cursor-pointer focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
              // Exclude top area (header) and bottom area (CTA)
              hasCallToAction(currentStory)
                ? "top-16 md:top-16 bottom-20 md:bottom-24" // Leave space for header and CTA
                : "top-16 md:top-16 bottom-0" // Leave space for header only
            )}
            onClick={(event) => {
              event.stopPropagation();
              handleTapZone("left");
            }}
            disabled={isFirstStory}
          />
          <button
            type="button"
            aria-label={`Next story${
              isLastStory ? " (will close viewer)" : ""
            }`}
            className={cn(
              "absolute user-select-none right-0 w-1/2  cursor-pointer focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
              // Exclude top area (header) and bottom area (CTA)
              hasCallToAction(currentStory)
                ? "top-16 md:top-16 bottom-20 md:bottom-24" // Leave space for header and CTA
                : "top-16 md:top-16 bottom-0" // Leave space for header only
            )}
            onClick={(event) => {
              event.stopPropagation();
              handleTapZone("right");
            }}
          />

          {/* Visual navigation indicators for desktop */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
            <div
              className={cn(
                "hidden md:block transition-opacity duration-200",
                isFirstStory ? "text-white/20" : "text-white/50"
              )}
            >
              <ChevronLeft className="w-7 h-7" />
            </div>
            <div className="hidden md:block text-white/50">
              <ChevronRight className="w-7 h-7" />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
