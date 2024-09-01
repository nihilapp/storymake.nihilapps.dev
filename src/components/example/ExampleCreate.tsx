'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateExample } from '@/src/hooks';
import { exampleKeys } from '@/src/data/query-keys';

interface Props {
  className?: ClassNameValue;
}

interface Inputs {
  name: string;
  description?: string;
}

export function ExampleCreate({ className, }: Props) {
  const formModel = object({
    name: string().required(),
    description: string(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const createExample = useCreateExample();
  const qc = useQueryClient();

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      createExample.mutate(data, {
        onSuccess() {
          form.setValue('name', '');
          form.setValue('description', '');

          qc.invalidateQueries({
            queryKey: exampleKeys.getAll,
          });
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
      <div className={css.default}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className=''>
          <label htmlFor='name'>
            <span>이름</span>
            <input type='text' id='name' {...form.register('name')} />
          </label>
          <label htmlFor='description'>
            <span>설명</span>
            <input type='text' {...form.register('description')} />
          </label>

          <button>추가</button>
        </form>
      </div>
    </>
  );
}
