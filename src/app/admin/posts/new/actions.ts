'use server';

import { createPost } from '$/server/lib/post';

export async function submit(title: string, content: string) {
  await createPost({
    title,
    content,
    blog: {
      connect: {
        id: 'cm3imovw7000108l5ernu7joo',
      },
    },
    createdBy: {
      connect: {
        email: 'janis@roulz.com',
      },
    },
  });
}
