import React from 'react';
import { setMeta } from '@/src/utils';
import { Nav } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '로그인',
  url: '/auth/signin',
});

export default function SignInModal() {
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <Nav />
      )}
      <div>signin page</div>
    </>
  );
}
