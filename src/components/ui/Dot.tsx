"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DotProps {
  className?: string;
  color?: string;
}

const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  ({ className, color = "text-purple-500" }, ref) => {
    return (
      <motion.span
        ref={ref}
        aria-hidden="true"
        className={cn(color, className)}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          opacity: {
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.7, 0.7, 1],
          },
        }}
      >
        .
      </motion.span>
    );
  }
);

Dot.displayName = "Dot";

export default Dot;
