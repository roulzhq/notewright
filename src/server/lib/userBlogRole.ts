'use server';
import {
  PrismaClient,
  type Prisma,
  type UserBlogRole,
  type Blog,
  type User,
} from '@prisma/client';

const prisma = new PrismaClient();

export async function createUserBlogRole(
  blog: Blog,
  role: UserBlogRole['role'],
  user: User,
) {
  const userBlogRole: Prisma.UserBlogRoleCreateInput = {
    blog: {
      connect: { id: blog.id },
    },
    role,
    user: {
      connect: { id: user.id },
    },
  };

  const createUserBlogRole = await prisma.userBlogRole.create({
    data: userBlogRole,
  });

  return createUserBlogRole.id;
}

export async function read() {
  console.log();
}

export async function update() {
  console.log();
}

export async function remove() {
  console.log();
}
