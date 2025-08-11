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
        <Button variant="secondary" icon={Mail}>
          <Link href={`mailto:${contactInfo.email}`}>Email</Link>
        </Button>
        <Button variant="secondary" icon={Linkedin}>
          <Link href={contactInfo.linkedin}>LinkedIn</Link>
        </Button>
      </Stack>
    </Animate>
  );
}
