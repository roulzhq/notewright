'use server';
import {
  PrismaClient,
  type Prisma,
  type UserBlogRole,
  Role,
} from '@prisma/client';

const prisma = new PrismaClient();

export async function createUserBlogRole(data: {
  blog: { id: string };
  role: Role;
  user: { id: string };
}): Promise<UserBlogRole['id']> {
  const createUserBlogRole = await prisma.userBlogRole.create({
    data: {
      role: data.role,
      blog: { connect: { id: data.blog.id } },
      user: { connect: { id: data.user.id } },
    },
  });
  return createUserBlogRole.id;
}

export async function readAllUserBlogRolesFromUser(
  userId: string,
): Promise<UserBlogRole[]> {
  return await prisma.userBlogRole.findMany({
    where: { userId },
    include: {
      user: true,
      blog: true,
    },
  });
}

export async function readAllUserBlogRolesFromBlog(
  blogId: string,
): Promise<UserBlogRole[]> {
  return await prisma.userBlogRole.findMany({
    where: { blogId },
    include: {
      user: true,
      blog: true,
    },
  });
}

export async function updateUserBlogRole(
  userBlogRoleId: string,
  newRole: Role,
): Promise<UserBlogRole> {
  return await prisma.userBlogRole.update({
    where: { id: userBlogRoleId },
    data: { role: newRole },
  });
}

export async function removeUserBlogRole(
  userBlogRoleId: string,
): Promise<UserBlogRole> {
  return await prisma.userBlogRole.delete({
    where: { id: userBlogRoleId },
  });
}
