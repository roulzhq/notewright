'use server';
import {
  PrismaClient,
  type Prisma,
  type Post,
  type User,
  type Blog,
} from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Creates a new blog post in the database.
 *
 * @param title - The title of the blog post.
 * @param content - The content of the blog post.
 * @param createdBy - The user who created the post.
 * @param blog - The blog to which the post belongs.
 * @param published - A boolean indicating whether the post is published or not.
 * @returns A Promise that resolves when the post is created. The created post is not returned.
 */
export async function createPost(data: Prisma.PostCreateInput): Promise<Post> {
  const createPost = await prisma.post.create({
    data,
  });

  return createPost;
}

export async function getAllPosts(blog: Blog['id']): Promise<Post[]> {
  const post = await prisma.post.findMany({
    where: {
      id: blog,
    },
  });

  return post;
}

export async function getPostById(postId: Post['id']): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  return post;
}

export async function updatePost(
  postId: Post['id'],
  data: Prisma.PostUpdateInput,
): Promise<Post | null> {
  const dateNow: Date = new Date();

  const post = await prisma.post.update({
    where: { id: postId },
    data,
  });

  return post;
}

export async function removePost(postId: Post['id']): Promise<Post | null> {
  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return post;
}
