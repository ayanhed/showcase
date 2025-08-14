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

  const [submissionState, setSubmissionState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: ''
  });

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState({ status: 'submitting', message: '' });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...formData
        })
      });

      if (response.ok) {
        setSubmissionState({
          status: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionState({
        status: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }
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
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit}
            >
              {/* Hidden input for Netlify forms */}
              <input type="hidden" name="form-name" value="contact" />
              
              <Stack spacing="lg">
                {/* Success/Error Messages */}
                {submissionState.status === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    {submissionState.message}
                  </div>
                )}
                {submissionState.status === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {submissionState.message}
                  </div>
                )}
                
                <Grid cols={2} gap="md" responsive={true}>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    label="Name*"
                    disabled={submissionState.status === 'submitting'}
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@doe.com"
                    label="Email*"
                    disabled={submissionState.status === 'submitting'}
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
                  disabled={submissionState.status === 'submitting'}
                />
                <Stack direction="horizontal" justify="end">
                  <Button 
                    type="submit" 
                    disabled={submissionState.status === 'submitting'}
                  >
                    {submissionState.status === 'submitting' ? 'Sending...' : 'Send'}
                  </Button>
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
