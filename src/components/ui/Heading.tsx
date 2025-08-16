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
  ({ className, level = 2, as, children, showDot = false, id, ...props }, ref) => {
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

    const extractText = (node: React.ReactNode): string => {
      if (typeof node === "string" || typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(extractText).join(" ");
      if (React.isValidElement(node)) return extractText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
      return "";
    };

    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const resolvedTag = Component;
    const numericLevel = parseInt(resolvedTag.replace("h", ""), 10);

    const autoId = slugify(extractText(children));
    const anchorId = id || (autoId || undefined);

    const isLinkable = numericLevel === 1 || numericLevel === 2;

    const content = isLinkable && anchorId ? (
      <a
        href={`#${anchorId}`}
        className="no-underline hover:underline decoration-gray-400 inline-flex items-baseline gap-2"
      >
        <span className="text-gray-400">#</span>
        <span>{children}</span>
      </a>
    ) : (
      children
    );

    return React.createElement(
      Component,
      {
        ref,
        id: anchorId,
        className: cn("text-white font-mono mb-4 scroll-mt-24", sizes[level], className),
        ...props,
      },
      showDot ? (
        <>
          {content}
          <Dot />
        </>
      ) : (
        content
      )
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
