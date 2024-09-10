'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { nihilTool } from '@nihilapp/tools';
import { useGetUsers } from '@/src/hooks';

interface Props {
  className?: ClassNameValue;
}

export function UserList({ className, }: Props) {
  const users = useGetUsers();
  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      {(users.isLoading || users.isFetching) && (
        <>로딩중...</>
      )}
      {users.isSuccess && (
        <div className={css.default}>
          {users.data.resData.map((user) => (
            <div key={nihilTool.common.uuid()}>{nihilTool.common.string(user)}</div>
          ))}
        </div>
      )}
    </>
  );
}
