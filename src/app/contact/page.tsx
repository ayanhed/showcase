"use client";

import { Suspense } from "react";
import {
  Section,
  Button,
  Input,
  Textarea,
  Container,
  HeroSection,
  Animate,
  Grid,
  Stack,
  Text,
  Card,
} from "@/components/ui";
import ContactQuickLinks from "@/components/ContactQuickLinks";
import { useSearchParams } from "next/navigation";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  return isSuccess ? (
    <Card>
      <div className="p-6 space-y-3">
        <Text as="p" className="text-green-400 font-medium" aria-live="polite">
          Thank you! Your message has been sent.
        </Text>
        <Text as="p" variant="muted">
          I will get back to you as soon as possible.
        </Text>
      </div>
    </Card>
  ) : (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      action="/contact?success=true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <Stack spacing="lg">
        <Grid cols={2} gap="md" responsive={true}>
          <Input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            label="Name*"
          />
          <Input
            type="email"
            name="email"
            required
            placeholder="john@doe.com"
            label="Email*"
          />
        </Grid>
        <Textarea
          name="message"
          required
          rows={4}
          placeholder="Hello there, I would like to ask you about..."
          label="Message*"
        />
        <Stack direction="horizontal" justify="end">
          <Button type="submit">Send</Button>
        </Stack>
      </Stack>
    </form>
  );
}

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
            className="dark-card p-8 mb-12"
          >
            <Suspense fallback={null}>
              <ContactFormContent />
            </Suspense>
          </Animate>

          {/* Alternative Contact Methods */}
          <ContactQuickLinks />
        </Container>
      </Section>
    </div>
  );
}
