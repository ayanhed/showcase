"use client";

import { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      label,
      error,
      helperText,
      disabled = false,
      className,
      size = "md",
      indeterminate = false,
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const iconSizes = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    return (
      <div className={cn("flex items-start", className)}>
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange?.(e.target.checked)}
              disabled={disabled}
              className="sr-only"
            />
            <div
              className={cn(
                "flex items-center justify-center border-2 rounded transition-colors",
                sizeClasses[size],
                checked || indeterminate
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
                error
                  ? "border-red-300 dark:border-red-600"
                  : "hover:border-gray-400 dark:hover:border-gray-500",
                disabled && "opacity-50 cursor-not-allowed",
                !disabled && "cursor-pointer"
              )}
              onClick={() => !disabled && onChange?.(!checked)}
            >
              {(checked || indeterminate) && (
                <Check
                  className={cn("text-white", iconSizes[size])}
                  strokeWidth={3}
                />
              )}
            </div>
          </div>
        </div>

        {label && (
          <div className="ml-3 text-sm">
            <label
              className={cn(
                "font-medium",
                disabled
                  ? "text-gray-400 dark:text-gray-500"
                  : "text-gray-700 dark:text-gray-300",
                !disabled && "cursor-pointer"
              )}
              onClick={() => !disabled && onChange?.(!checked)}
            >
              {label}
            </label>

            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            {helperText && !error && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
