import PageWrapper from '$/components/admin/PageWrapper/PageWrapper';
import { getAllPosts } from '$/server/lib/post';
import Link from 'next/link';

export default async function Page() {
  const data = await getAllPosts('cm3imovw7000108l5ernu7joo');

  return (
    <PageWrapper
      title={
        <h1>
          Posts <Link href="/admin/posts/new">+ new</Link>
        </h1>
      }
    >
      <ul>
        {data.map(post => (
          <li key={post.id}>
            <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}
