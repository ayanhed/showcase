"use client";

import { Section, Container, HeroSection, Animate } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import ContactQuickLinks from "@/components/ContactQuickLinks";

export default function Contact() {
  return (
    <div id="contact">
      {/* Hero Section */}
      <HeroSection
        title="Contact me"
        subtitle="I'm always eager to explore new opportunities and take on exciting projects. If you have a project in mind, or just want to say hi, feel free to send me a message."
      />

      {/* Contact Form */}
      <Section>
        <Container>
          <Animate
            type="slideUp"
            duration={0.8}
            delay={0.2}
            once={true}
            className="mb-12"
          >
            <ContactForm
              formName="contact"
              customEndpoint="/"
              showCard={true}
              showAnimation={false}
              layout="grid"
              resetOnSuccess={true}
            />
          </Animate>

          {/* Alternative Contact Methods */}
          <ContactQuickLinks />
        </Container>
      </Section>
    </div>
  );
}
