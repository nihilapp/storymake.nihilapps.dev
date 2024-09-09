'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useAdminSignIn } from '@/src/hooks';
import { usersStore } from '@/src/entities';

interface Props {
  className?: ClassNameValue;
}

export function AdminSignInButton({ className, }: Props) {
  const { me, setMe, } = usersStore();
  const signIn = useAdminSignIn();
  console.log('me >> ', me);

  const onClickSignIn = useCallback(
    () => {
      signIn.mutate({
        userEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
      }, {
        onSuccess(res) {
          setMe(res.data.data);
        },
      });
    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <button className={css.default} onClick={onClickSignIn}>관리자 로그인</button>
    </>
  );
}
