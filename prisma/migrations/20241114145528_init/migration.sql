-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'MODERATOR', 'AUTHOR', 'ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('FREE', 'HOBBY', 'PRO');

-- CreateEnum
CREATE TYPE "public"."CommentType" AS ENUM ('COMMENT', 'REPLY');

-- CreateTable
CREATE TABLE "public"."posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "plan" "public"."Plan" NOT NULL DEFAULT 'FREE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blogs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(255) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "public"."CommentType" NOT NULL DEFAULT 'COMMENT',
    "postId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_blog_roles" (
    "id" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "user_blog_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_createdById_createdAt_idx" ON "public"."posts"("createdById", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_email_createdAt_idx" ON "public"."users"("email", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "blogs_name_createdAt_idx" ON "public"."blogs"("name", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "user_blog_roles_userId_blogId_key" ON "public"."user_blog_roles"("userId", "blogId");

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_blog_roles" ADD CONSTRAINT "user_blog_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_blog_roles" ADD CONSTRAINT "user_blog_roles_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
