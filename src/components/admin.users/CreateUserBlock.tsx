'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { UserRole } from '@prisma/client';
import { useCreateUser } from '@/src/hooks';
import { usersKeys } from '@/src/data/query-keys';
import { usersStore } from '@/src/entities';
import { configData } from '@/src/data';

interface Props {
  className?: ClassNameValue;
}

interface Inputs {
  userEmail: string;
  userName: string;
  userRole: UserRole;
  password: string;
}

export function CreateUserBlock({ className, }: Props) {
  const me = usersStore((state) => state.me);

  const formModel = object({
    userEmail: string().required('이메일을 입력하세요.'),
    userName: string().required('닉네임을 입력하세요.'),
    userRole: string().required('사용자의 유형을 선택하세요.'),
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
      userName: '',
      userRole: '',
      password: '',
    },
  });

  const qc = useQueryClient();
  const createUser = useCreateUser();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      console.log('data >> ', data);

      try {
        createUser.mutate(data, {
          async onSuccess(res) {
            console.log('res >> ', res);
          },
        });

        qc.invalidateQueries({
          queryKey: usersKeys.getAll,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [ qc, me, configData, ]
  );

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className={css.default}>
        <label htmlFor='userEmail'>
          <span>이메일</span>
          <input type='email' id='userEmail' {...form.register('userEmail')} />
        </label>
        {form.formState.errors.userEmail && (
          <span>{form.formState.errors.userEmail.message}</span>
        )}
        <label htmlFor='userName'>
          <span>닉네임</span>
          <input type='text' id='userName' {...form.register('userName')} />
        </label>
        {form.formState.errors.userName && (
          <span>{form.formState.errors.userName.message}</span>
        )}
        <div>
          <label htmlFor='admin'>
            <input type='radio' id='admin' value='ADMIN' {...form.register('userRole')} />
            <span>관리자 계정</span>
          </label>
          <label htmlFor='user'>
            <input type='radio' id='user' value='USER' {...form.register('userRole')} />
            <span>사용자 계정</span>
          </label>
        </div>
        {form.formState.errors.userRole && (
          <span>{form.formState.errors.userRole.message}</span>
        )}
        <label htmlFor='password'>
          <span>비밀번호</span>
          <input type='password' id='password' autoComplete='off' {...form.register('password')} />
        </label>
        {form.formState.errors.password && (
          <span>{form.formState.errors.password.message}</span>
        )}
        <div>
          <button type='submit'>생성</button>
        </div>
      </form>
    </>
  );
}
