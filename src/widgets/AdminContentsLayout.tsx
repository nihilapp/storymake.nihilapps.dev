'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { usersStore } from '@/src/entities';

interface Props {
  className?: ClassNameValue;
  children: React.ReactNode;
}

export function AdminContentsLayout({ className, children, }: Props) {
  const { me, } = usersStore();

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <header>
        header
        <nav>nav</nav>
      </header>
      <main>
        {children}
        {/*{me}*/}
      </main>
    </>
  );
}
