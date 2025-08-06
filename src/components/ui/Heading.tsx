import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, as, children, ...props }, ref) => {
    const Component =
      as || (`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6");

    const sizes = {
      1: "text-4xl md:text-5xl lg:text-6xl font-bold",
      2: "text-3xl md:text-4xl font-bold",
      3: "text-2xl md:text-3xl font-semibold",
      4: "text-xl md:text-2xl font-semibold",
      5: "text-lg md:text-xl font-medium",
      6: "text-base md:text-lg font-medium",
    };

    return React.createElement(
      Component,
      {
        ref,
        className: cn("text-white", sizes[level], className),
        ...props,
      },
      children
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
