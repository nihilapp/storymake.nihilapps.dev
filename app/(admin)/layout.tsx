import React from 'react';
import { AdminPage, DefaultPage } from '@/src/widgets';
import { AdminSignInButton } from '@/src/components';

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children, }: Props) {
  return (
    <>
      <AdminPage>
        {children}
      </AdminPage>
    </>
  );
}
