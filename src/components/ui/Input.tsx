import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-white font-medium text-sm">
            {label}
          </label>
        )}
        <input
          className={cn(
            "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {helperText && !error && (
          <p className="text-gray-400 text-sm">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
