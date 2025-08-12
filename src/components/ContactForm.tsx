import React from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import { Animate, Grid, Stack } from "./ui";

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <Animate
      type="slideUp"
      duration={0.8}
      delay={0.2}
      once={true}
      className={className}
    >
      <Card>
        <form onSubmit={handleSubmit}>
          <Stack spacing="lg">
            <Grid cols={2} gap="md" responsive={true}>
              <Input
                type="text"
                placeholder="Your Name"
                label="Name*"
                required
              />
              <Input
                type="email"
                placeholder="john@doe.com"
                label="Email*"
                required
              />
            </Grid>
            <Textarea
              rows={4}
              placeholder="Hello there, I would like to ask you about..."
              label="Message*"
              required
            />
            <Stack direction="horizontal" justify="end">
              <Button type="submit">Send</Button>
            </Stack>
          </Stack>
        </form>
      </Card>
    </Animate>
  );
};

export default ContactForm;
