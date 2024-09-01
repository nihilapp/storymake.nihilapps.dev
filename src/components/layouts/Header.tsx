'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Logo, Nav } from '@/src/components';

interface Props {
  className?: ClassNameValue;
}

export function Header({ className, }: Props) {
  const style = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <header className={style.default}>
      <Logo />

      <div>
        <Nav />
      </div>
    </header>
  );
}
