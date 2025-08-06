import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import Container from "./Container";

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
    <Section spacing="lg" className={`pt-20 ${className}`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <Heading level={1} className="mb-6">
            {title}
          </Heading>
          {subtitle && (
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              {subtitle}
            </p>
          )}
          {children}
        </motion.div>
      </Container>
    </Section>
  );
};

export default HeroSection;
