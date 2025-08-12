"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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

// Stable segment definitions used by the chart
const SEGMENTS: Array<{
  label: string;
  x0: number;
  x1: number;
  color: string;
}> = [
  { label: "meh", x0: -1, x1: -0.8, color: "rgba(107,114,128,0.35)" },
  { label: "Good", x0: -0.8, x1: -0.4, color: "rgba(245,158,11,0.45)" },
  { label: "Great", x0: -0.4, x1: 0.4, color: "rgba(16,185,129,0.45)" },
  { label: "Good", x0: 0.4, x1: 0.8, color: "rgba(245,158,11,0.45)" },
  { label: "meh", x0: 0.8, x1: 1, color: "rgba(107,114,128,0.35)" },
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
  const prefersReducedMotion = useReducedMotion();

  const techData = useMemo<TechnologyDatum[]>(() => {
    return technologies.map((name) => {
      const value =
        (mapping && typeof mapping[name] === "number"
          ? mapping[name]!
          : defaultPositions[name]) ?? 0;
      return { name, value };
    });
  }, [technologies, mapping]);

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

  const hoveredSegmentIndex = useMemo(() => {
    if (!hovered) return null;
    const v = hovered.value;
    let idx: number | null = null;
    for (let i = 0; i < SEGMENTS.length; i++) {
      const s = SEGMENTS[i];
      const isLast = i === SEGMENTS.length - 1;
      const inRange = isLast ? v >= s.x0 && v <= s.x1 : v >= s.x0 && v < s.x1;
      if (inRange) {
        idx = i;
        break;
      }
    }
    return idx;
  }, [hovered]);

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
    <div ref={containerRef} className={cn("w-full relative", className)}>
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
          {SEGMENTS.map((s, i) => {
            const x0 = x(s.x0) + (i === 0 ? 0 : gap / 2);
            const x1 = x(s.x1) - (i === SEGMENTS.length - 1 ? 0 : gap / 2);
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
                <rect
                  x={x0}
                  y={bandY}
                  width={Math.max(0, x1 - x0)}
                  height={bandH}
                  fill={s.color}
                  rx={8}
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
            {/* Guides */}
            {(hovered ? [hovered] : visibleTech).map((d) => (
              <line
                key={`guide-${d.name}-${hovered ? "hover" : "idle"}`}
                className="guide"
                x1={x(d.value)}
                x2={x(d.value)}
                y1={12}
                y2={axisY}
                stroke="white"
                strokeLinecap="round"
                strokeDasharray="3,5"
                style={{
                  opacity: hovered ? 0.7 : 0.4,
                  strokeWidth: hovered ? 1.5 : 1,
                }}
              />
            ))}

            {/* Dots */}
            {visibleTech.map((d) => {
              const isHovered = hovered && hovered.name === d.name;
              return (
                <circle
                  key={`point-${d.name}`}
                  className="point"
                  cx={x(d.value)}
                  cy={axisY}
                  r={5}
                  fill="#ffffff"
                  fillOpacity={1}
                  stroke={"var(--color-accent-purple)"}
                  strokeWidth={isHovered ? 2.5 : 0}
                  onMouseEnter={() => setHovered(d)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </g>
        </g>
      </motion.svg>

      {/* Hover tooltip overlay for natural text wrapping */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="tooltip"
            ref={tooltipRef}
            className="pointer-events-none absolute z-10 rounded-md border border-[color:var(--color-accent-purple)]/20 bg-white/95 px-2 py-1 shadow-sm"
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
            <div className="flex items-center gap-2">
              <Image
                src={`/tech/${hovered.name.toLowerCase()}.svg`}
                alt=""
                width={16}
                height={16}
              />
              <span className="text-[12px] font-semibold text-gray-900 break-words whitespace-normal">
                {hovered.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive tech list */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {techData.map((t) => (
          <button
            key={t.name}
            type="button"
            onMouseEnter={() => setHovered(t)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(t)}
            onBlur={() => setHovered(null)}
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
