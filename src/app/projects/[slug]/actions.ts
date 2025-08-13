"use server";

import { projects, Project } from "@/lib/data";

export async function getProject(slug: string): Promise<Project | null> {
  const project = (projects as Project[]).find((p) => p.slug === slug);
  return project || null;
}
