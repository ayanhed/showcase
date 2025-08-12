import React from "react";
import { FileText, ArrowRight } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Link from "./ui/Link";
import { Stack, Text } from "./ui";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  isLatest?: boolean;
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article className="hover:bg-gray-800/50 transition-colors duration-300">
      <Card>
        <Stack direction="horizontal" spacing="md" align="start">
          <div className="flex-shrink-0 mt-1">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex-1">
            <Stack spacing="sm">
              <Stack direction="horizontal" spacing="sm" align="center">
                <h3 className="text-xl font-semibold text-white">
                  {post.title}
                </h3>
                {post.isLatest && (
                  <Badge variant="warning" size="sm">
                    🔥 Latest
                  </Badge>
                )}
              </Stack>

              <Text variant="muted">{post.date}</Text>
              <Text variant="muted">{post.excerpt}</Text>

              <Link
                href={`/blog/${post.slug}`}
                variant="underline"
                className="inline-flex items-center gap-2"
              >
                Read more
                <ArrowRight size={16} />
              </Link>
            </Stack>
          </div>
        </Stack>
      </Card>
    </article>
  );
};

export default BlogPostCard;
