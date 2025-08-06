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
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg leading-loose",
  xl: "text-xl leading-loose",
  "2xl": "text-2xl leading-loose",
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
        className,
        "mb-4"
      )}
    >
      {children}
    </Component>
  );
}
