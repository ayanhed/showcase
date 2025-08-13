import React from "react";
import { cn } from "@/lib/utils";
import Dot from "./Dot";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  showDot?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, as, children, showDot = false, ...props }, ref) => {
    const Component =
      as || (`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6");

    const sizes = {
      1: "text-6xl md:text-7xl lg:text-8xl font-bold",
      2: "text-5xl md:text-6xl font-bold",
      3: "text-4xl md:text-5xl font-semibold",
      4: "text-3xl md:text-4xl font-semibold",
      5: "text-2xl md:text-3xl font-medium",
      6: "text-xl md:text-2xl font-medium",
    };

    return React.createElement(
      Component,
      {
        ref,
        className: cn("text-white font-mono mb-4", sizes[level], className),
        ...props,
      },
      showDot ? (
        <>
          {children}
          <Dot />
        </>
      ) : (
        children
      )
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
