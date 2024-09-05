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
          <Link href='/admin/users'>사용자 관리</Link>
          <Link href='/auth/signin'>로그인</Link>
          <Link href='/auth/signup'>회원가입</Link>
        </div>
      </nav>
    </>
  );
}
