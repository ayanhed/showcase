"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  helperText,
  disabled = false,
  className,
  size = "md",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    options.find((option) => option.value === value) || null
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const option = options.find((option) => option.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;

    setSelectedOption(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-3",
    lg: "text-lg py-2.5 px-4",
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}

      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "w-full text-left bg-white dark:bg-gray-800 border rounded-md shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClasses[size],
            error
              ? "border-red-300 dark:border-red-600"
              : "border-gray-300 dark:border-gray-600",
            "hover:border-gray-400 dark:hover:border-gray-500"
          )}
          disabled={disabled}
        >
          <span
            className={cn(
              "block truncate",
              !selectedOption && "text-gray-500 dark:text-gray-400"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  "focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  selectedOption?.value === option.value &&
                    "bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100"
                )}
                disabled={option.disabled}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {selectedOption?.value === option.value && (
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
