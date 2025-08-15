import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "button" | "underline" | "muted";
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "text-white hover:text-purple-400 transition-colors",
      button: "btn-primary inline-flex items-center gap-2",
      muted: "text-gray-400 hover:text-white transition-colors",
      underline: "text-blue-400 hover:text-blue-300 font-medium underline",
    };

    return (
      <NextLink ref={ref} className={cn(variants[variant])} {...props}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
