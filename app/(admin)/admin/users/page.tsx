import React from 'react';
import { setMeta } from '@/src/utils';
import { AdminBlock } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '사용자 관리',
  url: '/admin/users',
});

export default function AdminUserPage() {
  return (
    <AdminBlock />
  );
}
