import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "muted" | "accent" | "success" | "warning" | "error";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
  as?: "p" | "span" | "div";
}

const sizeClasses = {
  xs: "text-sm mb-1", // increased from text-xs to text-sm
  sm: "text-base mb-1 leading-snug", // increased from text-sm to text-base
  md: "text-lg mb-2 leading-loose", // increased from text-base to text-lg
  lg: "text-xl mb-4 leading-loose", // increased from text-lg to text-xl
  xl: "text-2xl mb-4 leading-loose", // increased from text-xl to text-2xl
  "2xl": "text-3xl mb-4 leading-loose", // increased from text-2xl to text-3xl
};

const variantClasses = {
  default: "text-white",
  muted: "text-gray-400",
  accent: "text-blue-400",
  success: "text-green-400",
  warning: "text-yellow-400",
  error: "text-red-400",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export default function Text({
  children,
  size = "md",
  variant = "default",
  weight = "normal",
  align = "left",
  className,
  as: Component = "p",
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      {children}
    </Component>
  );
}
