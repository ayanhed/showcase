"use client";

import React from "react";
import Image from "next/image";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Badge from "./ui/Badge";
import Text from "./ui/Text";
import Animate from "./ui/Animate";
import Icon from "./ui/Icon";
import { personalInfo } from "@/lib/data";
import { StoryViewer } from "@/components/stories";
import { stories as defaultStories } from "@/lib/data";
import { MapPin } from "lucide-react";

interface HeroProps {
  personalInfo: typeof personalInfo;
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  const [isStoriesOpen, setStoriesOpen] = React.useState(false);
  return (
    <Section spacing="lg">
      {/* Main Gradient Card */}
      <Animate type="slideUp" duration={0.8} delay={0.2}>
        <div className="relative drop-shadow-lg bg-gradient-to-r from-green-900 overflow-hidden via-purple-800 to-pink-600 p-[0.5px] rounded-3xl">
          {/* Background Image inside the card */}
          <div className="absolute inset-0 z-0">
            <Animate type="fade" duration={0.7} delay={0.4}>
              <Image
                src="/hero-image.jpg"
                alt="Hero background"
                fill
                className="object-cover rounded-3xl opacity-65 lg:object-top object-bottom blur-xs"
                priority
              />
            </Animate>
          </div>

          <div className="bg-gradient-to-br from-black via-black/50 to-black/20 rounded-3xl p-5 lg:p-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              {/* Left Side - Content */}
              <div className="space-y-8 order-2 lg:order-1 flex-1">
                {/* About Me Section */}
                <Animate type="slideRight" duration={0.6} delay={0.4}>
                  <div className="space-y-4">
                    <Heading
                      level={1}
                      className="text-white text-4xl lg:text-5xl font-bold"
                    >
                      Hi, I&apos;m {personalInfo.name.split(" ")[0]} 👋
                    </Heading>

                    <Text
                      size="xl"
                      variant="default"
                      className="text-white/90 leading-relaxed"
                    >
                      {personalInfo.about}
                    </Text>
                  </div>
                </Animate>

                {/* Mission Section */}
                <Animate type="slideRight" duration={0.6} delay={0.6}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="success"
                        size="sm"
                        className="bg-transparent border border-green-500 text-green-500"
                      >
                        MY MISSION
                      </Badge>
                    </div>

                    <Text
                      size="lg"
                      variant="default"
                      className="text-white/90 leading-relaxed"
                    >
                      {personalInfo.mission}
                    </Text>

                    <Text size="md" variant="muted" className="italic">
                      Keep moving, don&apos;t settle. 🚀
                    </Text>
                  </div>
                </Animate>
              </div>

              {/* Right Side - Profile Image */}
              <div className="flex justify-center order-1 lg:order-2 flex-1">
                <Animate type="scale" duration={0.8} delay={0.8}>
                  <div className="relative group hover:animate-glow">
                    {/* Prominent Glow Effect - Behind Image */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/40 via-purple-500/40 to-pink-500/40 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110 -z-10"></div>

                    {/* Additional Animated Glow Rings - Behind Image */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1200 group-hover:scale-125 animate-pulse -z-20"></div>

                    {/* Enhanced Gradient Border with Stronger Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-purple-500 to-pink-500 rounded-full blur-md opacity-90 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse -z-30"></div>

                    {/* Additional Outer Glow Layer */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-400/30 via-purple-500/30 to-pink-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-1500 group-hover:duration-300 -z-40"></div>

                    {/* Profile Image Container with Fade Effect */}
                    <div className="relative z-10">
                      {/* Enhanced Floating Animation Overlay */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>
                      <button
                        id="hero-profile"
                        aria-label="Open stories"
                        onClick={() => setStoriesOpen(true)}
                        className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl relative group-hover:shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-purple-500"
                      >
                        {/* Base Image */}
                        <Image
                          src={personalInfo.profileImage || "/profile.jpg"}
                          alt={`${personalInfo.name} profile`}
                          width={320}
                          height={320}
                          className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                          priority
                          onError={(e) => {
                            // Fallback to simple SVG if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = "/profile.jpg";
                          }}
                        />
                      </button>

                      {/* Floating Badge - Working Remotely */}
                      <Animate type="slideUp" duration={0.8} delay={0.8}>
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-1">
                          <div className="flex items-center justify-center gap-2 px-3 py-2 lg:px-4 lg:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg shadow-black/25 transition-all duration-700 group-hover:shadow-xl group-hover:shadow-black/30 group-hover:bg-white/15 group-hover:border-white/30">
                            <Icon
                              icon={MapPin}
                              size="sm"
                              className="text-green-400 group-hover:text-green-300 transition-colors duration-700"
                            />
                            <Text
                              size="sm"
                              className="text-white/90 m-0 font-medium whitespace-nowrap group-hover:text-white transition-colors duration-700"
                            >
                              {personalInfo.location}
                            </Text>
                          </div>
                        </div>
                      </Animate>
                    </div>
                  </div>
                </Animate>
              </div>
            </div>
          </div>
        </div>
      </Animate>
      <StoryViewer
        isOpen={isStoriesOpen}
        onClose={() => setStoriesOpen(false)}
        stories={defaultStories}
        author={{ name: personalInfo.name, avatar: personalInfo.profileImage }}
      />
    </Section>
  );
};

export default Hero;
