import React from 'react';
import { setMeta } from '@/hooks/setMeta';

interface Props {
  //
}

export const metadata = setMeta({
  title: '회원가입',
  url: '/auth/signup',
});

export default function SignUpPage() {
  return (
    <>
      <div>content</div>
    </>
  );
}
