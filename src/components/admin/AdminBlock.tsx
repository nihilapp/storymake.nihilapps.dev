'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { usersStore } from '@/src/entities';
import { CreateUserBlock, UserList } from '@/src/components';

interface Props {
  className?: ClassNameValue;
}

export function AdminBlock({ className, }: Props) {
  const { me, } = usersStore();

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <UserList />
      <CreateUserBlock />
    </>
  );
}
