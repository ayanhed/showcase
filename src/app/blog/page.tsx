"use client";

import { blogPosts } from "@/lib/data";
import {
  Section,
  Heading,
  Container,
  HeroSection,
  CallToAction,
  Animate,
  Stack,
} from "@/components/ui";
import BlogPostCard from "@/components/BlogPostCard";
import JsonLd from "@/components/JsonLd";
import { getBlogPageSchemas } from "@/lib/jsonld";

export default function Blog() {
  return (
    <div id="blog">
      {/* JSON-LD Structured Data */}
      <JsonLd data={getBlogPageSchemas()} />
      
      {/* Hero Section */}
      <HeroSection
        title="Tech Blog"
        subtitle="A blog about technology, programming, and various intriguing topics. Here I share my experiences, projects and opinions."
      />

      {/* Blog Posts */}
      <Section>
        <Container>
          <Animate
            type="slideUp"
            duration={0.8}
            delay={0.2}
            once={true}
            className="mb-8"
          >
            <Heading level={2} className="mb-6" showDot>
              All Posts
            </Heading>
          </Animate>

          <Stack spacing="lg">
            {blogPosts.map((post, index) => (
              <Animate
                key={post.slug}
                type="slideUp"
                delay={index * 0.1}
                once={true}
              >
                <BlogPostCard post={post} index={index} />
              </Animate>
            ))}
          </Stack>
        </Container>
      </Section>

      {/* Call to Action */}
      <CallToAction
        title="Want to discuss a project or have questions about my work?"
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </div>
  );
}
