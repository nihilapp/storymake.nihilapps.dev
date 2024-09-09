'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  className?: ClassNameValue;
}

export function TokenCheckButton({ className, }: Props) {
  const checkToken

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <button type={'button'}>토큰 체크</button>
    </>
  );
}
