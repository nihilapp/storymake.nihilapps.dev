import React from 'react';
import { setMeta } from '@/src/utils';
import { AdminSignInBlock } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '관리자 로그인',
  url: '/admin/auth/signin',
});

export default function page() {
  return (
    <AdminSignInBlock />
  );
}
