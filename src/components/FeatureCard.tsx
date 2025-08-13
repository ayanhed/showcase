import React from "react";
import { motion } from "framer-motion";
import Card from "./ui/Card";
import { cn } from "@/lib/utils";
import Text from "./ui/Text";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { LucideIcon } from "lucide-react";
import Heading from "./ui/Heading";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "green" | "orange" | "purple" | "blue";
  className?: string;
  cta?: {
    text: string;
    href: string;
  };
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  variant = "green",
  className,
  cta,
}) => {
  const variantColors = {
    green: "bg-accent-green",
    orange: "bg-accent-orange",
    purple: "bg-accent-purple",
    blue: "bg-accent-blue",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn("h-full", className)}
    >
      <Card className="h-full">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center",
              variantColors[variant]
            )}
          >
            <Icon icon={icon} size="sm" className="text-white" />
          </div>
          <Heading level={6} className="text-white font-semibold mb-0">
            {title}
          </Heading>
        </div>
        <Text>{description}</Text>
        {cta && (
          <Button variant="secondary" as="a" href={cta.href}>
            {cta.text}
          </Button>
        )}
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
