import React from 'react';
import { AdminContentsLayout } from '@/src/widgets';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children, }: Props) {
  return (
    <AdminContentsLayout>
      {children}
    </AdminContentsLayout>
  );
}
