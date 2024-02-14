import React from 'react';
import { Footer, Header, Main } from '@/components/Layout';

interface Props {
  children: React.ReactNode;
}

export default function CommonLayout({ children, }: Props) {
  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  );
}
