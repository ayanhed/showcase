import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import Container from "./Container";
import Text from "./Text";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <Section spacing="lg" className={`${className}`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <Heading level={1} showDot>
            {title}
          </Heading>
          {subtitle && (
            <Text variant="muted" align="center" className="max-w-3xl mx-auto">
              {subtitle}
            </Text>
          )}
          {children}
        </motion.div>
      </Container>
    </Section>
  );
};

export default HeroSection;
