import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref
  ) => {
    const variants = {
      default:
        "bg-white/10 text-white border border-white/20 shadow-lg shadow-black/10",
      primary:
        "bg-blue-500/20 text-blue-100 border border-blue-400/30 shadow-lg shadow-blue-500/20",
      secondary:
        "bg-gray-500/20 text-gray-100 border border-gray-400/30 shadow-lg shadow-gray-500/20",
      success:
        "bg-green-500/20 text-green-100 border border-green-400/30 shadow-lg shadow-green-500/20",
      warning:
        "bg-orange-500/20 text-orange-100 border border-orange-400/30 shadow-lg shadow-orange-500/20",
    };

    const sizes = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium font-mono",
          "backdrop-blur-md backdrop-saturate-150",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
