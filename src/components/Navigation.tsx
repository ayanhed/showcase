"use client";

import Link from "next/link";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { contactInfo } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "My work", href: "/projects" },
  { name: "About Me", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Scroll-driven mini avatar next to logo
  const [slideProgress, setSlideProgress] = useState(0); // 0 = hidden left, 1 = fully visible next to logo

  useEffect(() => {
    let rafId: number | null = null;

    const heroEl = document.getElementById("hero-profile");
    if (!heroEl) return; // Only run on pages that contain the hero

    const update = () => {
      const rect = heroEl.getBoundingClientRect();
      const avatarHeight = Math.max(1, rect.height || 1);

      // Start revealing when the top of the hero avatar reaches 24px from the top
      // Fully revealed when the avatar has completely left the viewport
      const start = 24; // px from top to start the animation
      const end = -avatarHeight; // when fully above the viewport
      const raw = (start - rect.top) / (start - end);
      const nextProgress = Math.min(1, Math.max(0, raw));
      setSlideProgress(nextProgress);

      rafId = window.requestAnimationFrame(update);
    };

    rafId = window.requestAnimationFrame(update);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const socials = [
    { href: contactInfo.github, label: "GitHub", Icon: Github },
    { href: contactInfo.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: contactInfo.instagram, label: "Instagram", Icon: Instagram },
  ].filter((s) => Boolean(s.href));

  return (
    <nav className="fixed top-0 bg-dark-bg/80 backdrop-blur-md z-50 w-full ">
      <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-16 container mx-auto px-4">
        {/* Logo */}
        <div className="relative flex items-center gap-0 col-start-1">
          {/* Sliding small avatar, controlled by scroll */}
          <div
            aria-hidden
            className="relative h-8 overflow-hidden"
            style={{
              width: `${32 * slideProgress}px`,
              transition: "width 120ms linear",
            }}
          >
            <div
              className="relative h-8 w-8 rounded-full overflow-hidden border border-white/20 shadow"
              style={{
                transform: `translateX(${(-12 + 12 * slideProgress)}px)`,
                opacity: slideProgress,
                transition: "opacity 120ms linear",
              }}
            >
              <Image
                src="/profile.jpg"
                alt="mini avatar"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <Link
            href="/"
            className="text-3xl font-bold text-white"
            style={{ marginLeft: `${8 * slideProgress}px` }}
          >
            AH
            <motion.span
              aria-hidden="true"
              className="text-purple-500"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                opacity: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.7, 0.7, 1],
                },
              }}
            >
              .
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation (centered) */}
        <div className="hidden md:flex items-center gap-8 relative justify-self-center md:col-start-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 text-sm font-medium ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-2 h-0.5 bg-purple-500 rounded"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 40,
                      mass: 0.5,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Socials (desktop) + Mobile menu button */}
        <div className="flex items-center gap-2 justify-self-end col-start-3">
          <div className="hidden md:flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon size={25} />
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={30} /> : <Menu size={35} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            {socials.length > 0 && (
              <div className="px-2 pb-4 pt-1 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  {socials.map(({ href, label, Icon }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
