'use server';
import { PrismaClient, type Prisma, type User } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      plan: data.plan ?? 'FREE',
    },
  });
  return user;
}

export async function readUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

export async function readUserByMail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export async function readUserByBlog(blogId: string): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      blogRoles: {
        some: {
          blogId,
        },
      },
    },
    include: {
      blogRoles: true,
    },
  });
  return users;
}

export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput,
): Promise<User | null> {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
}

export async function removeUser(id: string): Promise<User | null> {
  // Perform a soft delete by setting deletedAt field instead of actually deleting the record
  const user = await prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
  return user;
}
