import { createClient } from '$/utils/supabase/server';

import './Navbar.scss';

export default async function AdminNavbar() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return <nav className="navbar">{data.user?.email}</nav>;
}
