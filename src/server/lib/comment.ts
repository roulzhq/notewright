'use server';
import { PrismaClient, type Prisma, type Comment } from '@prisma/client';

const prisma = new PrismaClient();

export async function createComment(
  data: Prisma.CommentCreateInput,
): Promise<Comment> {
  const comment = await prisma.comment.create({
    data,
  });
  return comment;
}

export async function readCommentFromPost(postId: string): Promise<Comment[]> {
  const comments = await prisma.comment.findMany({
    where: { postId },
  });
  return comments;
}

export async function updateComment(
  id: string,
  data: Prisma.CommentUpdateInput,
): Promise<Comment | null> {
  const comment = await prisma.comment.update({
    where: { id },
    data,
  });
  return comment;
}

export async function removeComment(id: string): Promise<Comment | null> {
  // Perform a soft delete by setting deletedAt field instead of actually deleting the record
  const comment = await prisma.comment.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
  return comment;
}
