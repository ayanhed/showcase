import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "outlined";
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "dark", children, ...props }, ref) => {
    const variants = {
      default: "bg-white border border-gray-200 shadow-sm",
      dark: "dark-card",
      outlined: "border border-gray-700 bg-transparent",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-4 sm:p-6 overflow-hidden",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
