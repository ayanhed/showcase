import React from "react";
import Image from "next/image";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Badge from "./ui/Badge";
import Text from "./ui/Text";
import Animate from "./ui/Animate";
import { personalInfo } from "@/lib/data";

interface HeroProps {
  personalInfo: typeof personalInfo;
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
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
                objectPosition="top"
                fill
                className="object-cover rounded-3xl opacity-65"
                priority
              />
            </Animate>
          </div>

          <div className="bg-gradient-to-br from-black via-black/50 to-black/20 rounded-3xl p-8 lg:p-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Content */}
              <div className="space-y-8">
                {/* About Me Section */}
                <Animate type="slideRight" duration={0.6} delay={0.4}>
                  <div className="space-y-4">
                    <Heading
                      level={1}
                      className="text-white text-4xl lg:text-5xl font-bold"
                    >
                      hey, I&apos;m {personalInfo.name.split(" ")[0]} 👋
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
            </div>
          </div>
        </div>
      </Animate>
    </Section>
  );
};

export default Hero;
