import React from "react";
import Link from "next/link";
import Container from "./ui/Container";

interface FooterProps {
  personalInfo: {
    name: string;
  };
  contactInfo: {
    github: string;
    email: string;
  };
}

const Footer: React.FC<FooterProps> = ({ personalInfo, contactInfo }) => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="text-center text-gray-400">
          <p className="mb-4">Copyright © 2021 - 2025 {personalInfo.name}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-2">Important Links</h4>
              <div className="space-y-1">
                <Link
                  href="/"
                  className="block hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="block hover:text-white transition-colors"
                >
                  My work
                </Link>
                <Link
                  href="/blog"
                  className="block hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Social</h4>
              <div className="space-y-1">
                <Link
                  href={contactInfo.github}
                  className="block hover:text-white transition-colors"
                >
                  Github
                </Link>
                <Link
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  LinkedIn
                </Link>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="block hover:text-white transition-colors"
                >
                  Email
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Other</h4>
              <div className="space-y-1">
                <Link
                  href="/about"
                  className="block hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block hover:text-white transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Download CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
