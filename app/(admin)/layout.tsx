import React from 'react';
import { DefaultPage } from '@/src/widgets';
import { SignInButton } from '@/src/components';

interface Props {
  children: React.ReactNode;
}

export default function CommonLayout({ children, }: Props) {
  return (
    <>
      <SignInButton />
      {children}
    </>
  );
}
