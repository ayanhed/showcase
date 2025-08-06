import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      children,
      as = "button",
      href,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg";

    const variants = {
      primary:
        "bg-accent-blue text-white hover:bg-blue-600 hover:transform hover:-translate-y-0.5 focus:ring-blue-500",
      secondary:
        "bg-dark-card text-white border border-white/10 hover:bg-white/5 hover:transform hover:-translate-y-0.5 focus:ring-gray-500",
      ghost:
        "text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-500",
      outline:
        "border border-gray-700 text-white hover:bg-gray-800 focus:ring-gray-500",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm rounded-md",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-8 py-4 text-lg rounded-lg",
    };

    const classes = cn(baseClasses, variants[variant], sizes[size], className);

    if (as === "a") {
      return (
        <a
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {Icon && iconPosition === "left" && <Icon className="mr-2 h-4 w-4" />}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon className="ml-2 h-4 w-4" />
          )}
        </a>
      );
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="mr-2 h-4 w-4" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="ml-2 h-4 w-4" />}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
