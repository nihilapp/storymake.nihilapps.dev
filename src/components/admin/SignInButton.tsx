'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useSignIn } from '@/src/hooks';
import { usersStore } from '@/src/entities';

interface Props {
  className?: ClassNameValue;
}

export function SignInButton({ className, }: Props) {
  const { me, setMe, } = usersStore();
  const signIn = useSignIn();
  console.log('me >> ', me);

  const onClickSignIn = useCallback(
    () => {
      signIn.mutate({
        userEmail: 'nihil_ncunia@naver.com',
        password: 'iu0516jej0818',
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
