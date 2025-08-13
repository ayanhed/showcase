"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Badge from "./Badge";

export interface TechnologyDatum {
  name: string;
  value: number; // -1 .. 1 (negative=server, 0=great, positive=client)
  note?: string;
}

interface SkillSpectrumProps {
  technologies: string[];
  mapping?: Partial<Record<string, number>>; // numeric mapping
  height?: number; // optional minimum height override
  className?: string;
}

// Default numeric positions for common tech
const defaultPositions: Record<string, number> = {
  React: 0.1,
  "Next.js": 0.1,
  Redux: 0.35,
  TypeScript: 0.15,
  CSS: 0.45,
  Tailwind: 0.4,
  Webpack: 0.45,
  Gatsby: 0.4,
  "Node.js": -0.5,
  Express: -0.5,
  Docker: -0.8,
  Git: -0.3,
  AWS: -0.4,
  Azure: -0.4,
  Shopify: 0.3,
  Storybook: 0.3,
};

// Color constants for segments
const SEGMENT_COLORS = {
  meh: {
    color: "rgba(107,114,128,0.15)",
    glassColor: "rgba(107,114,128,0.25)",
    borderColor: "rgba(107,114,128,0.3)",
  },
  good: {
    color: "rgba(245,158,11,0.15)",
    glassColor: "rgba(245,158,11,0.25)",
    borderColor: "rgba(245,158,11,0.4)",
  },
  great: {
    color: "rgba(16,185,129,0.15)",
    glassColor: "rgba(16,185,129,0.25)",
    borderColor: "rgba(16,185,129,0.4)",
  },
} as const;

// Segment definitions for different screen sizes
const SEGMENTS_DESKTOP: Array<{
  label: string;
  x0: number;
  x1: number;
  color: string;
  glassColor: string;
  borderColor: string;
}> = [
  {
    label: "meh",
    x0: -1,
    x1: -0.8,
    ...SEGMENT_COLORS.meh,
  },
  {
    label: "Good",
    x0: -0.8,
    x1: -0.4,
    ...SEGMENT_COLORS.good,
  },
  {
    label: "Great",
    x0: -0.4,
    x1: 0.4,
    ...SEGMENT_COLORS.great,
  },
  {
    label: "Good",
    x0: 0.4,
    x1: 0.8,
    ...SEGMENT_COLORS.good,
  },
  {
    label: "meh",
    x0: 0.8,
    x1: 1,
    ...SEGMENT_COLORS.meh,
  },
];

const SEGMENTS_MOBILE: Array<{
  label: string;
  x0: number;
  x1: number;
  color: string;
  glassColor: string;
  borderColor: string;
}> = [
  {
    label: "meh",
    x0: -1,
    x1: -0.7,
    ...SEGMENT_COLORS.meh,
  },
  {
    label: "Good",
    x0: -0.7,
    x1: -0.3,
    ...SEGMENT_COLORS.good,
  },
  {
    label: "Great",
    x0: -0.3,
    x1: 0.3,
    ...SEGMENT_COLORS.great,
  },
  {
    label: "Good",
    x0: 0.3,
    x1: 0.7,
    ...SEGMENT_COLORS.good,
  },
  {
    label: "meh",
    x0: 0.7,
    x1: 1,
    ...SEGMENT_COLORS.meh,
  },
];

function labelForValue(v: number) {
  const abs = Math.abs(v);
  if (abs < 0.25) return "Great";
  if (abs < 0.6) return "Good";
  return "meh";
}

function sideForValue(v: number) {
  return v >= 0 ? "client" : "server";
}

export default function SkillSpectrum({
  technologies,
  mapping,
  height,
  className,
}: SkillSpectrumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(720);
  const [hovered, setHovered] = useState<TechnologyDatum | null>(null);
  const [autoPlayActive, setAutoPlayActive] = useState<boolean>(true);
  const [currentAutoPlayIndex, setCurrentAutoPlayIndex] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const techData = useMemo<TechnologyDatum[]>(() => {
    const data = technologies.map((name) => {
      const value =
        (mapping && typeof mapping[name] === "number"
          ? mapping[name]!
          : defaultPositions[name]) ?? 0;
      return { name, value };
    });

    // Sort by weight/value (positive numbers first, then negative)
    return data.sort((a, b) => {
      // If one is positive and one is negative, positive comes first
      if (a.value >= 0 && b.value < 0) return -1;
      if (a.value < 0 && b.value >= 0) return 1;
      // If both are positive or both are negative, sort by value
      return a.value - b.value;
    });
  }, [technologies, mapping]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlayActive || techData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentAutoPlayIndex(() => {
        // Randomly select a technology index
        return Math.floor(Math.random() * techData.length);
      });
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [autoPlayActive, techData.length]);

  // Update hovered state based on auto-play
  useEffect(() => {
    if (autoPlayActive && techData.length > 0) {
      setHovered(techData[currentAutoPlayIndex]);
    }
  }, [autoPlayActive, currentAutoPlayIndex, techData]);

  // User interaction handlers
  const handleUserInteraction = () => {
    if (autoPlayActive) {
      setAutoPlayActive(false);
    }
  };

  const handleDotHover = (tech: TechnologyDatum) => {
    setHovered(tech);
  };

  const handleDotLeave = () => {
    if (!autoPlayActive) {
      setHovered(null);
    }
  };

  // Component-level mouse handlers for auto-play control
  const handleComponentMouseEnter = () => {
    setAutoPlayActive(false);
  };

  const handleComponentMouseLeave = () => {
    setAutoPlayActive(true);
  };

  // Responsive width
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w && Math.abs(w - width) > 1) setWidth(w);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [width]);

  // Derived layout values for declarative SVG
  const margin = { top: 32, right: 24, bottom: 28, left: 24 } as const;
  const outerWidth = Math.max(320, width);
  const innerWidth = outerWidth - margin.left - margin.right;

  const x = useMemo(
    () => d3.scaleLinear().domain([-1, 1]).range([0, innerWidth]).nice(),
    [innerWidth]
  );

  const bandY = 12;
  const bandH = 48;
  const axisY = bandY + bandH + 22;
  const gap = 6;
  const labelBubbleHeight = 22;
  const labelBubbleGap = 6;
  const labelY = bandY - 6 - labelBubbleHeight - labelBubbleGap; // place above background

  // Select segments based on screen width (mobile breakpoint at 768px)
  const segments = useMemo(() => {
    return width < 768 ? SEGMENTS_MOBILE : SEGMENTS_DESKTOP;
  }, [width]);

  const hoveredSegmentIndex = useMemo(() => {
    if (!hovered) return null;
    const v = hovered.value;
    let idx: number | null = null;
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i];
      const isLast = i === segments.length - 1;
      const inRange = isLast ? v >= s.x0 && v <= s.x1 : v >= s.x0 && v < s.x1;
      if (inRange) {
        idx = i;
        break;
      }
    }
    return idx;
  }, [hovered, segments]);

  const boundaries = [0];

  const visibleTech: TechnologyDatum[] = techData;

  // Compute the minimal outer height required by content
  const innerContentBottom = axisY + 28; // include side labels
  const innerContentTop = Math.min(bandY - 6, 12);
  const innerContentHeight = innerContentBottom - Math.max(0, innerContentTop);
  const computedOuterHeight = margin.top + innerContentHeight + margin.bottom;
  const outerHeight = Math.max(computedOuterHeight, height ?? 0);

  // Tooltip measurement for dynamic width and positioning
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState<number>(0);
  useEffect(() => {
    if (!hovered) {
      setTooltipWidth(0);
      return;
    }
    const el = tooltipRef.current;
    if (el) setTooltipWidth(el.offsetWidth);
  }, [hovered, width]);

  // Compute overlay tooltip position (HTML, not SVG) so wrapping works
  const overlayTopPx = margin.top + labelY;
  const overlayLeftPx = hovered
    ? Math.min(
        Math.max(8, margin.left + x(hovered.value) - tooltipWidth / 2),
        outerWidth - margin.right - tooltipWidth
      )
    : 0;

  return (
    <div
      ref={containerRef}
      className={cn("w-full relative", className)}
      onMouseEnter={handleComponentMouseEnter}
      onMouseLeave={handleComponentMouseLeave}
    >
      <motion.svg
        width="100%"
        viewBox={`0 0 ${outerWidth} ${outerHeight}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Skill spectrum chart"
        style={{ height: outerHeight, display: "block" }}
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion ? undefined : { duration: 0.35, ease: "easeOut" }
        }
      >
        {/* Glass effect filter */}
        <defs>
          <filter
            id="glass-effect"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.1 0"
            />
            <feBlend mode="overlay" in="SourceGraphic" />
          </filter>
          <filter id="glass-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" />
          </filter>
          {/* Dot glass effect filter */}
          <filter id="dot-glass" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.3 0"
            />
          </filter>
          {/* Active dot glow effect */}
          <filter
            id="active-dot-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Track background */}
          <rect
            x={0}
            y={bandY - 6}
            width={innerWidth}
            height={bandH + 12}
            fill="none"
            rx={10}
          />

          {/* Colored segments with labels */}
          {segments.map((s, i) => {
            const x0 = x(s.x0) + (i === 0 ? 0 : gap / 2);
            const x1 = x(s.x1) - (i === segments.length - 1 ? 0 : gap / 2);
            const mid = (x0 + x1) / 2;
            const segOpacity =
              hovered && hoveredSegmentIndex !== null
                ? i === hoveredSegmentIndex
                  ? 1
                  : 0.25
                : 1;
            return (
              <motion.g
                key={`${s.label}-${i}`}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: -4 }
                }
                animate={{ opacity: segOpacity, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { delay: i * 0.05, duration: 0.35, ease: "easeOut" }
                }
              >
                {/* Glass effect background */}
                <rect
                  x={x0}
                  y={bandY}
                  width={Math.max(0, x1 - x0)}
                  height={bandH}
                  fill={s.glassColor}
                  rx={8}
                  filter="url(#glass-blur)"
                  opacity={0.3}
                />
                {/* Main glass segment */}
                <rect
                  x={x0}
                  y={bandY}
                  width={Math.max(0, x1 - x0)}
                  height={bandH}
                  fill={s.color}
                  rx={8}
                  stroke={s.borderColor}
                  strokeWidth={1}
                  style={{
                    backdropFilter: "blur(8px) saturate(150%)",
                    filter: "url(#glass-effect)",
                  }}
                />
                <text
                  x={mid}
                  y={bandY + bandH / 2 + 5}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize={14}
                  fontWeight={700}
                  style={{
                    paintOrder: "stroke",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    strokeOpacity: 0.6,
                  }}
                >
                  {s.label}
                </text>
              </motion.g>
            );
          })}

          {/* Side labels */}
          <text
            x={x(-0.1)}
            y={axisY + 30}
            textAnchor="end"
            fill="#a0a0a0"
            fontSize={12}
          >
            &larr; Server-side
          </text>
          <text
            x={x(0.1)}
            y={axisY + 30}
            textAnchor="start"
            fill="#a0a0a0"
            fontSize={12}
          >
            Client-side &rarr;
          </text>

          {/* Axis line */}
          <line
            x1={0}
            x2={innerWidth}
            y1={axisY}
            y2={axisY}
            stroke="#fff"
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />

          {/* Boundary ticks */}
          {boundaries.map((bv, idx) => (
            <line
              key={`tick-${bv}`}
              x1={x(bv)}
              x2={x(bv)}
              y1={axisY}
              y2={
                axisY + (idx === 0 || idx === boundaries.length - 1 ? 12 : 10)
              }
              stroke="#fff"
              strokeOpacity={0.6}
              strokeWidth={1.2}
            />
          ))}

          {/* Marker layer */}
          <g className="marker-layer">
            {/* Guides - only show when hovered */}
            {hovered && (
              <line
                key={`guide-${hovered.name}-hover`}
                className="guide"
                x1={x(hovered.value)}
                x2={x(hovered.value)}
                y1={12}
                y2={axisY}
                stroke="white"
                strokeLinecap="round"
                strokeDasharray="3,5"
                style={{
                  opacity: 0.7,
                  strokeWidth: 1.5,
                }}
              />
            )}

            {/* Dots */}
            {visibleTech.map((d) => {
              const isHovered = hovered && hovered.name === d.name;

              return (
                <g key={`point-${d.name}`}>
                  {/* Glow effect for active dot */}
                  <motion.circle
                    cx={x(d.value)}
                    cy={axisY}
                    r={6}
                    fill="var(--color-accent-purple)"
                    opacity={0}
                    filter="url(#active-dot-glow)"
                    animate={{
                      opacity: isHovered ? 0.3 : 0,
                      scale: isHovered ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  />
                  {/* Glass effect background */}
                  <motion.circle
                    cx={x(d.value)}
                    cy={axisY}
                    r={3}
                    fill="rgba(255,255,255,0.2)"
                    filter="url(#dot-glass)"
                    opacity={0.4}
                    animate={{
                      scale: isHovered ? 1.33 : 1, // Scale up by 33% when hovered
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  />
                  {/* Main glass dot */}
                  <motion.circle
                    className="point"
                    cx={x(d.value)}
                    cy={axisY}
                    r={3}
                    fill="rgba(255,255,255,0.9)"
                    stroke={
                      isHovered
                        ? "var(--color-accent-purple)"
                        : "rgba(255,255,255,0.3)"
                    }
                    strokeWidth={isHovered ? 2 : 1}
                    onMouseEnter={() => handleDotHover(d)}
                    onMouseLeave={handleDotLeave}
                    style={{
                      cursor: "pointer",
                      backdropFilter: "blur(4px) saturate(150%)",
                      filter: "url(#glass-effect)",
                    }}
                    animate={{
                      scale: isHovered ? 1.33 : 1, // Scale up by 33% when hovered
                      strokeWidth: isHovered ? 2 : 1,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  />
                </g>
              );
            })}
          </g>
        </g>
      </motion.svg>

      {/* Hover tooltip overlay using Badge component */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="tooltip"
            ref={tooltipRef}
            className="pointer-events-none absolute z-10"
            style={{
              left: 0,
              top: 0,
              maxWidth: outerWidth - margin.left - margin.right - 16,
            }}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, x: overlayLeftPx, y: overlayTopPx }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 0.18, ease: "easeOut" }
            }
          >
            <Badge
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
            >
              <Image
                src={`/tech/${hovered.name.toLowerCase()}.svg`}
                alt=""
                width={16}
                height={16}
              />
              <span className="break-words whitespace-normal">
                {hovered.name}
              </span>
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive tech list */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {techData.map((t) => (
          <button
            key={t.name}
            type="button"
            onMouseEnter={() => handleDotHover(t)}
            onMouseLeave={handleDotLeave}
            onFocus={() => handleDotHover(t)}
            onBlur={handleDotLeave}
            className={cn(
              "px-4 py-2.5 rounded-full cursor-pointer",
              "bg-white/10 text-white hover:bg-white/20 transition-colors",
              "flex items-center gap-2 transition-transform duration-200 will-change-transform",
              hovered && hovered.name === t.name
                ? "scale-[1.02]"
                : "hover:scale-[1.02]"
            )}
            aria-label={`${t.name} (${sideForValue(t.value)}, ${labelForValue(
              t.value
            )})`}
            title={`${t.name} (${sideForValue(t.value)}, ${labelForValue(
              t.value
            )})`}
          >
            <Image
              src={`/tech/${t.name.toLowerCase()}.svg`}
              alt={t.name}
              width={25}
              height={25}
            />
            <span className="text-md font-medium">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
