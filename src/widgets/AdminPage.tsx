'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { AdminSignOutButton, PageLink } from '@/src/components';
import { usersStore } from '@/src/entities';

interface Props {
  className?: ClassNameValue;
  children: React.ReactNode;
}

export function AdminPage({ className, children, }: Props) {
  const { me, } = usersStore();

  const pathname = usePathname();
  console.log(pathname);

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <nav>
        {me ? (
          <>
            <AdminSignOutButton /><br />
            안녕하세요. {me.userName}님.
          </>
        ) : (
          <PageLink link='/admin/auth/signin'>관리자 로그인</PageLink>
        )}
        {process.env.NODE_ENV === 'development' && (
          <PageLink link='/admin/auth/signup'>관리자 추가</PageLink>
        )}
      </nav>
      <main>
        {(me?.userRole === 'ADMIN') || (pathname === '/admin/auth/signup') || (pathname === '/admin/auth/signin') ? (
          children
        ) : (
          <h2>관리자가 아니면 이 페이지를 볼 수 없습니다.</h2>
        )}
      </main>
    </>
  );
}
