import React from "react";
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";
import Text from "./Text";
import Stack from "./Stack";

export interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
  onClose?: () => void;
  className?: string;
  showIcon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "default",
  title,
  onClose,
  className = "",
  showIcon,
}) => {
  const variants = {
    default: {
      container:
        "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20",
      text: "text-purple-300",
      icon: "text-purple-400",
      iconComponent: null,
    },
    success: {
      container:
        "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20",
      text: "text-green-300",
      icon: "text-green-400",
      iconComponent: CheckCircle,
    },
    warning: {
      container:
        "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20",
      text: "text-yellow-300",
      icon: "text-yellow-400",
      iconComponent: AlertCircle,
    },
    error: {
      container:
        "bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/20",
      text: "text-red-300",
      icon: "text-red-400",
      iconComponent: XCircle,
    },
    info: {
      container:
        "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20",
      text: "text-blue-300",
      icon: "text-blue-400",
      iconComponent: Info,
    },
  };

  const currentVariant = variants[variant];
  const IconComponent = currentVariant.iconComponent;
  const shouldShowIcon =
    showIcon !== undefined ? showIcon : variant !== "default";

  return (
    <div
      className={`inline-flex items-start px-4 py-3 border rounded-lg w-full ${currentVariant.container} ${className}`}
    >
      <Stack
        direction="horizontal"
        spacing="sm"
        align="start"
        className="flex-1"
      >
        {shouldShowIcon && IconComponent && (
          <IconComponent className={`h-5 w-5 mt-0.5 ${currentVariant.icon}`} />
        )}
        <Stack spacing="xs" className="flex-1">
          {title && (
            <Text size="sm" weight="semibold" className={currentVariant.text}>
              {title}
            </Text>
          )}
          <Text size="sm" className={currentVariant.text}>
            {children}
          </Text>
        </Stack>
      </Stack>
      {onClose && (
        <button
          onClick={onClose}
          className={`ml-2 p-1 rounded-md hover:bg-white/10 transition-colors ${currentVariant.icon}`}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
