'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  className?: ClassNameValue;
  children: React.ReactNode;
}

export function AdminAuthLayout({ className, children, }: Props) {
  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      {children}
    </>
  );
}
