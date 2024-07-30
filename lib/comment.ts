import { prisma } from "./db";

// Define the type for the comments properties
interface CommentsProps {
  slug: string;
  name: string;
  comment: string;
}

// Function to fetch comments based on the slug
export async function getComments(slug: string) {
  return await prisma.user.findMany({
    where: { slug },
    orderBy: { publishAt: "asc" },
  });
}

// Function to create a new comment
export async function createComments({ slug, name, comment }: CommentsProps) {
  return await prisma.user.create({
    data: {
      slug,
      name,
      comment,
    },
  });
}
