import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Container from "./Container";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

interface CallToActionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  className,
}) => {
  return (
    <Section className={className}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <p className="text-lg text-gray-400 mb-6">{title}</p>
          {description && <p className="text-gray-400 mb-6">{description}</p>}
          <Button icon={ArrowRight} iconPosition="right">
            <a href={buttonHref}>{buttonText}</a>
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};

export default CallToAction;
