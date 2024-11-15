import { type Metadata } from 'next';
import { Suspense } from 'react';

import FullpageLoader from '$/components/shared/FullpageLoader/FullpageLoader';
import AdminNavbar from '$/components/admin/Navbar/Navbar';
import AdminSidebar from '$/components/admin/Sidebar/Sidebar';

import './layout.scss';

export const metadata: Metadata = {
  title: 'Notewright - Admin',
  description: 'Manage your Notewright',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<FullpageLoader />}>
      <div className="admin">
        <AdminSidebar />
        <AdminNavbar />
        <div className="admin-content">{children}</div>
      </div>
    </Suspense>
  );
}
