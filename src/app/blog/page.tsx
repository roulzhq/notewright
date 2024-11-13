import { getAllPosts } from '../../server/lib/post';

interface BlogProps {
  blogId: string;
}

export default async function Blog({ blogId }: BlogProps) {
  const posts = await getAllPosts(blogId);

  return (
    <div>
      <h1>The blog, public stuff</h1>
      {posts.map(post => (
        <p key={post.title}>Post: {post.title}</p>
      ))}
    </div>
  );
}
