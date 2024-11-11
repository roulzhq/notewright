'use server';
import {
  PrismaClient,
  type Prisma,
  type Blog,
  type User,
  type UserBlogRole,
} from '@prisma/client';
import { createUserBlogRole } from './userBlogRole';

const prisma = new PrismaClient();

export async function createBlog(name: string, published: boolean, user: User) {
  const blog: Prisma.BlogCreateInput = {
    name,
    published,
  };

  const createBlog = await prisma.blog.create({ data: blog });

  await createUserBlogRole(createBlog, 'OWNER', user);

  return createBlog.id;
}

export async function read() {}

export async function update() {}

export async function remove() {}
