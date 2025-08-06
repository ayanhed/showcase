import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StackProps {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  className?: string;
  wrap?: boolean;
}

const spacingClasses = {
  xs: "space-y-1",
  sm: "space-y-2",
  md: "space-y-4",
  lg: "space-y-6",
  xl: "space-y-8",
};

const horizontalSpacingClasses = {
  xs: "space-x-1",
  sm: "space-x-2",
  md: "space-x-4",
  lg: "space-x-6",
  xl: "space-x-8",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export default function Stack({
  children,
  direction = "vertical",
  spacing = "md",
  align = "start",
  justify = "start",
  className,
  wrap = false,
}: StackProps) {
  const isHorizontal = direction === "horizontal";
  const spacingClass = isHorizontal
    ? horizontalSpacingClasses[spacing]
    : spacingClasses[spacing];

  return (
    <div
      className={cn(
        "flex",
        isHorizontal ? "flex-row" : "flex-col",
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        spacingClass,
        className
      )}
    >
      {children}
    </div>
  );
}
