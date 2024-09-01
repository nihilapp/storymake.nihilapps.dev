import React from 'react';
import { setMeta } from '@/src/utils';
import { Nav } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '회원가입',
  url: '/auth/signup',
});

export default function SignUpModal() {
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <Nav />
      )}
      <div>signup page</div>
    </>
  );
}
