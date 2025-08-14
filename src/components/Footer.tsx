"use client";

import React from "react";
import Link from "./ui/Link";
import Container from "./ui/Container";
import Text from "./ui/Text";
import Heading from "./ui/Heading";
import Stack from "./ui/Stack";
import Grid from "./ui/Grid";
import { personalInfo, contactInfo } from "@/lib/data";
import {
  Github,
  Mail,
  Linkedin,
  Instagram,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Button } from "./ui";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: contactInfo.github,
      icon: Github,
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      href: contactInfo.linkedin,
      icon: Linkedin,
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      href: contactInfo.instagram,
      icon: Instagram,
      color: "hover:text-pink-400",
    },
    {
      name: "Email",
      href: `mailto:${contactInfo.email}`,
      icon: Mail,
      color: "hover:text-green-400",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-dark-bg via-dark-bg to-gray-900/50 border-t border-white/5">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <Stack className="py-16 lg:py-20">
          {/* Main footer content */}
          <Grid cols={4} gap="xl" className="mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <Stack spacing="lg">
                <Stack spacing="md">
                  <Heading
                    level={3}
                    showDot
                    className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  >
                    {personalInfo.name}
                  </Heading>
                  <Text
                    size="lg"
                    variant="muted"
                    className="max-w-md leading-relaxed"
                  >
                    {personalInfo.about}
                  </Text>
                </Stack>

                {/* Mission statement */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full">
                  <Text size="sm" weight="medium" className="text-purple-300">
                    {personalInfo.mission}
                  </Text>
                </div>
              </Stack>
            </div>

            {/* Quick links */}
            <div>
              <Stack spacing="lg">
                <Heading level={5}>Quick Links</Heading>
                <Stack spacing="sm">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      // className="block text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 group"
                    >
                      <Stack direction="horizontal" spacing="sm" align="center">
                        {link.name}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      </Stack>
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </div>

            {/* Contact & Social */}
            <div>
              <Stack spacing="lg">
                <Heading level={5}>Connect</Heading>
                <Stack spacing="lg">
                  {/* Contact info */}
                  <Stack spacing="sm">
                    <Stack
                      direction="horizontal"
                      spacing="sm"
                      align="center"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Mail className="h-4 w-4 text-purple-400" />
                      <Link href={`mailto:${contactInfo.email}`}>
                        {contactInfo.email}
                      </Link>
                    </Stack>
                    <Stack
                      direction="horizontal"
                      spacing="sm"
                      align="center"
                      className="text-gray-400"
                    >
                      <MapPin className="h-4 w-4 text-purple-400" />
                      <Text size="sm" variant="muted">
                        {contactInfo.location}
                      </Text>
                    </Stack>
                  </Stack>

                  {/* Social links */}

                  <Stack direction="horizontal" spacing="md">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <Button
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          variant="ghost"
                          rel="noopener noreferrer"
                          icon={Icon}
                          aria-label={social.name}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
            </div>
          </Grid>

          {/* Bottom section */}
          <div className="pt-8 border-t border-white/5 w-full">
            <Stack
              direction="horizontal"
              justify="between"
              align="center"
              className="flex-col sm:flex-row space-y-4 sm:space-y-0"
            >
              {/* Copyright */}
              <Stack direction="horizontal" spacing="sm" align="center">
                <Text size="xs" variant="muted">
                  © {currentYear} {personalInfo.name}. All rights reserved.
                </Text>
              </Stack>

              {/* Additional links */}
              <Stack direction="horizontal" spacing="lg" align="center">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Back to top
                </Link>
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
