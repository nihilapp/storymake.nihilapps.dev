'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { PageLink } from '@/src/components';
import style from './admin.module.css';

interface Props {
  className?: ClassNameValue;
}

export function AdminMain({ className, }: Props) {
  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <header className={style.test}>
        <PageLink link='/'>홈으로 이동</PageLink>
      </header>
      <main className={style.main}>
        <div className={style.linkBox}>
          <PageLink link='/admin/auth/signup'>관리자 등록</PageLink>
        </div>
        <div className={style.linkBox}>
          <PageLink link='/admin/users'>사용자 관리</PageLink>
        </div>
      </main>
    </>
  );
}
