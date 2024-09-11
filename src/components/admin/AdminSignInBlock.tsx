'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAdminSignIn } from '@/src/hooks';
import { usersKeys } from '@/src/data/query-keys';
import { usersStore } from '@/src/entities';

interface Props {
  className?: ClassNameValue;
}

interface Inputs {
  userEmail: string;
  password: string;
}

export function AdminSignInBlock({ className, }: Props) {
  const { setMe, } = usersStore();

  const formModel = object({
    userEmail: string().required('이메일을 입력하세요.')
      .matches(/([a-zA-Z0-9_])@([a-z.])/, {
        message: '이메일 형식이 아닙니다.',
      }),
    password: string().required('비밀번호를 입력하세요.')
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(30, '비밀번호는 30자 이하여야 합니다.')
      .matches(/(?=.*\d)(?=.*[a-zA-Z])/, {
        message: '비밀번호는 숫자와 영문자를 조합해야 합니다.',
      }),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      userEmail: '',
      password: '',
    },
  });

  const qc = useQueryClient();
  const adminSignIn = useAdminSignIn();

  const router = useRouter();

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      console.log(data);

      adminSignIn.mutate(data, {
        onSuccess(res) {
          setMe(res.resData);

          qc.invalidateQueries({
            queryKey: usersKeys.getAll,
          });

          router.replace('/admin/users');
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
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <div>
          <label htmlFor='email'>
            <span>이메일</span>
            <input
              type='email'
              id='email'
              {...form.register('userEmail')}
            />
          </label>
          <label htmlFor='password'>
            <span>비밀번호</span>
            <input
              type='password'
              id='password'
              autoComplete='off'
              {...form.register('password')}
            />
          </label>
        </div>
        <div>
          <button type='submit'>관리자 로그인</button>
        </div>
      </form>
    </>
  );
}
