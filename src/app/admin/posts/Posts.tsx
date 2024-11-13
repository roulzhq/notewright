// app/posts/posts.tsx
'use client';

import { getAllPosts } from '$/server/lib/post';
import { useQuery } from '@tanstack/react-query';

export default function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts('1'),
  });

  return <pre>{JSON.stringify(data)}</pre>;
}
