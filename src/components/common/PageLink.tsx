'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';

interface Props {
  className?: ClassNameValue;
  link: string;
  children: React.ReactNode;
}

export function PageLink({ className, link, children, }: Props) {
  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <Link href={link} className={css.default}>{children}</Link>
    </>
  );
}
