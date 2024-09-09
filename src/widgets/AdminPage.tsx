'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { AdminSignInButton, AdminSignOutButton } from '@/src/components';
import { usersStore } from '@/src/entities';

interface Props {
  className?: ClassNameValue;
  children: React.ReactNode;
}

export function AdminPage({ className, children, }: Props) {
  const { me, } = usersStore();

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
          <AdminSignOutButton />
        ) : (
          <AdminSignInButton />
        )}
      </nav>
      <main>
        {me?.userRole === 'ADMIN' ? (
          children
        ) : (
          <h2>관리자가 아니면 이 페이지를 볼 수 없습니다.</h2>
        )}
      </main>
    </>
  );
}
