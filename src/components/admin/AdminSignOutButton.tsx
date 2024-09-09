'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { SignOutDto, usersStore } from '@/src/entities';
import { useSignOut } from '@/src/hooks';

interface Props {
  className?: ClassNameValue;
}

export function AdminSignOutButton({ className, }: Props) {
  const { me, setMe, } = usersStore();

  const signOut = useSignOut();

  const onClickSignOut = useCallback(
    () => {
      signOut.mutate({
        user: me,
      } satisfies SignOutDto, {
        onSuccess(res) {
          console.log(res);

          setMe(null);
        },
      });
    },
    [ me, ]
  );

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <button type='button' onClick={onClickSignOut} className={css.default}>로그아웃</button>
  );
}
