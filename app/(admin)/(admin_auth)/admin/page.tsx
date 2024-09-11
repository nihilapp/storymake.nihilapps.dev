import React from 'react';
import { setMeta } from '@/src/utils';
import { AdminMain } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '관리자',
  url: '/admin',
});

export default function page() {
  return (
    <AdminMain />
  );
}
