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
  return (
    <Animate
      type="slideUp"
      duration={0.8}
      delay={0.2}
      once={true}
      className={className}
    >
      <Card>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/contact?success=true"
        >
          {/* Netlify form hidden fields */}
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
                placeholder="Your Name"
                label="Name*"
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="john@doe.com"
                label="Email*"
                required
              />
            </Grid>
            <Textarea
              name="message"
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
