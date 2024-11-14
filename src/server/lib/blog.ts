'use server';
import { PrismaClient, type Prisma, type Blog, type User, type Role } from '@prisma/client';
import { createUserBlogRole } from './userBlogRole';

const prisma = new PrismaClient();

/**
 * Creates a new blog and assigns the user an owner role.
 * @param name - The name of the blog.
 * @param published - Boolean indicating if the blog is published.
 * @param user - The user who will own the blog.
 * @returns The ID of the created blog.
 */
export async function createBlog(name: string, published: boolean, user: User): Promise<string> {
  const blog: Prisma.BlogCreateInput = {
    name,
    published,
  };

  const createdBlog = await prisma.blog.create({ data: blog });

  await createUserBlogRole({
    blog: { id: createdBlog.id },
    role: 'OWNER',
    user: { id: user.id },
  });

  return createdBlog.id;
}

/**
 * Reads a blog by its ID.
 * @param blogId - The ID of the blog to retrieve.
 * @returns The blog data or null if not found.
/*************  ✨ Codeium Command ⭐  *************/
/**
/******  ae79ff1e-22dd-46e7-bbe5-6d2b7ba1abc2  *******/ */
export async function readBlogById(blogId: string): Promise<Blog | null> {
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    include: {
      posts: true,
      userRoles: true,
    },
  });
  return blog;
}

/**
 * Updates a blog's information.
 * @param blogId - The ID of the blog to update.
 * @param data - The updated blog data.
 * @returns The updated blog data or null if the blog does not exist.
 */
export async function updateBlog(blogId: string, data: Prisma.BlogUpdateInput): Promise<Blog | null> {
  const blog = await prisma.blog.update({
    where: { id: blogId },
    data,
  });
  return blog;
}

/**
 * Soft deletes a blog by setting its deletedAt field.
 * @param blogId - The ID of the blog to delete.
 * @returns The deleted blog data or null if the blog does not exist.
 */
export async function removeBlog(blogId: string): Promise<Blog | null> {
  const blog = await prisma.blog.update({
    where: { id: blogId },
    data: {
      deletedAt: new Date(),
    },
  });
  return blog;
}
