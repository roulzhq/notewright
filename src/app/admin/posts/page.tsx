// app/posts/page.tsx
import { getAllPosts } from '$/server/lib/post';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Posts from './Posts';

export default async function PostsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts('1'),
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
}
