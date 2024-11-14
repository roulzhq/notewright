'use client';

import { useSearchParams } from 'next/navigation';
import { login, signup } from './actions';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') ?? '/';

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login.bind(null, nextUrl)}>Log in</button>
      <button formAction={signup.bind(null, nextUrl)}>Sign up</button>
    </form>
  );
}
