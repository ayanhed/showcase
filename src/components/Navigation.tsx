"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

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

  return (
    <nav className="fixed top-0 bg-dark-bg/80 backdrop-blur-md z-50 w-full ">
      <div className="flex justify-between items-center h-16 container mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          AH.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition-colors duration-200 ${
                pathname === item.href
                  ? "nav-active"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Settings Icon */}
        <div className="hidden md:flex items-center">
          <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
            <Settings size={20} />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
