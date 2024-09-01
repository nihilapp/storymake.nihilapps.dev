'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  className?: ClassNameValue;
  link: string;
  children: React.ReactNode;
}

export function ExternalLink({ className, link, children, }: Props) {
  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <a
        className={css.default}
        href={link}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    </>
  );
}
