import Link from 'next/link';

import './Sidebar.scss';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h1>Notewright</h1>
      <ul>
        <li>
          <Link href="/admin">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/posts">Posts</Link>
        </li>
      </ul>
    </nav>
  );
}
