import React from 'react';
import { setMeta } from '@/src/utils';
import { CreateAdminBlock } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '관리자 회원가입',
  url: '/admin/auth/signup',
});

export default function page() {
  return (
    <CreateAdminBlock />
  );
}
