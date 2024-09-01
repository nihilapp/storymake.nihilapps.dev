'use client';

import React from 'react';
import Link from 'next/link';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  styles?: ClassNameValue
}

export function Nav({ styles, }: Props) {
  const style = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <nav className={style.default}>
        <div>
          <Link href='/'>홈</Link>
          <Link href='/auth/signin'>로그인</Link>
          <Link href='/auth/signup'>회원가입</Link>
          <Link href='/test'>테스트</Link>
        </div>
      </nav>
    </>
  );
}
