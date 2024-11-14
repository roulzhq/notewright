'use client';

import { useSearchParams } from 'next/navigation';
import { login, signup } from './actions';
import { useState } from 'react';

import './page.scss';

export default function LoginPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') ?? '/';

  if (isLoginForm) {
    return (
      <div className="login">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={login.bind(null, nextUrl)}>Log in</button>
        </form>
        <button onClick={() => setIsLoginForm(false)}>Sign up instead</button>
      </div>
    );
  } else {
    return (
      <div className="signup">
        <h1>Sign up</h1>
        <form>
          <label htmlFor="firstName">First name:</label>
          <input id="firstName" name="firstName" type="text" required />
          <label htmlFor="lastName">Last name:</label>
          <input id="lastName" name="lastName" type="text" required />
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={signup.bind(null, nextUrl)}>Sign up</button>
        </form>
        <button onClick={() => setIsLoginForm(true)}>Login instead</button>
      </div>
    );
  }
}
