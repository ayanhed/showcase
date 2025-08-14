"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Instagram } from "lucide-react";
import { contactInfo } from "@/lib/data";
import Modal from "./ui/Modal";
import { Button, Stack, Text } from "./ui";

const navItems = [
  { name: "Home", href: "/" },
  { name: "My work", href: "/projects" },
  { name: "About Me", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { href: contactInfo.github, label: "GitHub", Icon: Github },
  { href: contactInfo.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: contactInfo.instagram, label: "Instagram", Icon: Instagram },
].filter((s) => Boolean(s.href));

interface MobileNavigationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileNavigation({
  isOpen,
  onOpenChange,
}: MobileNavigationProps) {
  const pathname = usePathname();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} title="Navigation Menu">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          onClick={() => onOpenChange(false)}
          className="text-2xl font-bold text-white"
        >
          AH
          <span className="text-purple-400">.</span>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2 mb-8">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={`block px-4 py-3 rounded-xl transition-colors duration-200 font-medium ${
                  isActive
                    ? "bg-purple-500/20 text-white border border-purple-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Social Links */}
      {socials.length > 0 && (
        <Stack className="pt-6 border-t border-white/10" direction="vertical">
          <Text size="xs" variant="muted">
            Connect with me
          </Text>
          <Stack className="flex items-center gap-3" direction="horizontal">
            {socials.map(({ href, label, Icon }) => (
              <Button
                key={label}
                as="a"
                href={href}
                target="_blank"
                aria-label={label}
                variant="ghost"
                size="lg"
                icon={Icon}
                onClick={() => onOpenChange(false)}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </Modal>
  );
}
