'use server';

import { createPost } from '$/server/lib/post';

export async function submit(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  await createPost({
    title: data.title,
    content: data.content,
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
