"use server"
import { PrismaClient, type Prisma, type Post, type User, type Blog } from "@prisma/client"

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
export async function createPost(title: string, content: string, createdBy: User, blog: Blog, published: boolean){
    const post: Prisma.PostCreateInput = {
        title,
        content,
        createdBy: {
            connect: { id: createdBy.id }
        },
        blog: {
            connect: { id: blog.id }
        },
        published    
    }

    const createPost = await prisma.post.create({ data: post });

    return createPost.id;
}

export async function getAllPosts(blog: Blog["id"]){
    const post = await prisma.post.findMany({
        where: {
          id: blog,
        },
      })

      return post;
}

export async function getPostById(postId: Post["id"]){
    const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      })

    return post;
}

export async function updatePost(postId: Post["id"], published?: boolean, title?: string, content?: string){
    const dateNow: Date = new Date();

    const post = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            published,
            title,
            content,
            updatedAt: dateNow,
          },
    })

    return post;
}

export async function removePost(postId: Post["id"]){

    const post = await prisma.post.delete({
        where: {
            id: postId,
        },
    })

    return post;
}