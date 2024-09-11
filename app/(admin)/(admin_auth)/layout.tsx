import React from 'react';
import { AdminAuthLayout } from '@/src/widgets';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children, }: Props) {
  return (
    <AdminAuthLayout>
      {children}
    </AdminAuthLayout>
  );
}
