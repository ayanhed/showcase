"use client";

import { useState } from "react";
import { Mail, MessageCircle, Github } from "lucide-react";
import { contactInfo } from "@/lib/data";
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
} from "@/components/ui";

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
      <div className="bg-dark-bg">
        {/* Hero Section */}
        <HeroSection
          title="Contact me."
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
            <Animate
              type="slideUp"
              duration={0.8}
              delay={0.4}
              once={true}
              className="text-center"
            >
              <Text variant="muted" align="center">
                Or contact me with...
              </Text>
              <Stack
                direction="horizontal"
                spacing="md"
                className="justify-center"
              >
                <Button variant="secondary" icon={Mail}>
                  <a href={`mailto:${contactInfo.email}`}>Email</a>
                </Button>
                <Button variant="secondary" icon={Github}>
                  <a href={contactInfo.github}>GitHub</a>
                </Button>
                <Button variant="secondary" icon={MessageCircle}>
                  <a href={contactInfo.linkedin}>LinkedIn</a>
                </Button>
              </Stack>
            </Animate>
          </Container>
        </Section>
      </div>
    </div>
  );
}
