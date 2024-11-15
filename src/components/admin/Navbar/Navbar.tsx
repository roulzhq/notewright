import LoginButton from '$/components/shared/LoginButton/LoginButton';
import LogoutButton from '$/components/shared/LogoutButton/LogoutButton';
import { createClient } from '$/utils/supabase/server';

import './Navbar.scss';

export default async function AdminNavbar() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <nav className="navbar">
      <div className="navbar__right">
        <b>{data.user?.email}</b>
        {data.user ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}
