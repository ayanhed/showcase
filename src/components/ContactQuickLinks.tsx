import { Linkedin, Mail } from "lucide-react";
import { contactInfo } from "../lib/data";
import { Animate, Button, Link, Stack, Text } from "./ui";

export default function ContactQuickLinks() {
  return (
    <Animate
      type="slideUp"
      duration={0.8}
      delay={0.4}
      once={true}
      className="text-center mt-8"
    >
      <Text variant="muted" align="center">
        Or contact me with...
      </Text>
      <Stack direction="horizontal" spacing="sm" className="justify-center">
        <Button
          variant="secondary"
          icon={Mail}
          as="a"
          target="_blank"
          href={`mailto:${contactInfo.email}`}
        >
          Email
        </Button>
        <Button
          variant="secondary"
          icon={Linkedin}
          as="a"
          target="_blank"
          href={contactInfo.linkedin}
        >
          LinkedIn
        </Button>
      </Stack>
    </Animate>
  );
}
