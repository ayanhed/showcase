"use client";

import { useState } from "react";
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
} from "@/components/ui";
import ContactQuickLinks from "@/components/ContactQuickLinks";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            <form onSubmit={handleSubmit}>
              <Stack spacing="lg">
                <Grid cols={2} gap="md" responsive={true}>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    label="Name*"
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@doe.com"
                    label="Email*"
                  />
                </Grid>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
          </Animate>

          {/* Alternative Contact Methods */}
          <ContactQuickLinks />
        </Container>
      </Section>
    </div>
  );
}
