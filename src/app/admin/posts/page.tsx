import { getAllPosts } from '$/server/lib/post';

export default async function Page() {
  const data = await getAllPosts('1');

  return <pre>{JSON.stringify(data)}</pre>;
}
