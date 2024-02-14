'use client';

import React, { useCallback, useEffect } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { supaClient } from '@/utils/supabase';

interface Props {
  styles?: ClassNameValue;
}

export function SignInButton({ styles, }: Props) {
  useEffect(() => {
    async function getSessionUser() {
      const session = await supaClient.auth.getSession();
      const user = await supaClient.auth.getUser();

      console.log(session, user);
    }

    getSessionUser();
  });
  const onClickSignIn = useCallback(
    async () => {
      await supaClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <button onClick={onClickSignIn}>로그인</button>
    </>
  );
}
