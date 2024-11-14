'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '$/utils/supabase/server';
import { createUser, readUserByMail } from '$/server/lib/user';

export async function login(nextUrl: string, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath(nextUrl, 'layout');
  redirect(nextUrl);
}

export async function signup(nextUrl: string, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
  };

  const existingUser = await readUserByMail(data.email);

  if (existingUser) {
    return redirect('/error');
  }

  const { error } = await supabase.auth.signUp(data);

  if (!error) {
    try {
      await createUser(data);
    } catch (error) {
      console.log(error);
      redirect('/error');
    }
  }

  if (error) {
    redirect('/error');
  }

  revalidatePath(nextUrl, 'layout');
  redirect(nextUrl);
}
