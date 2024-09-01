'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { nihilTool } from '@nihilapp/tools';
import { useGetExamples } from '@/src/hooks';
import { IsSuccess } from '@/src/components';

interface Props {
  className?: ClassNameValue;
}

export function ExampleList({ className, }: Props) {
  const {
    data: examples,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetExamples();

  console.log(isLoading, isFetching, isSuccess);

  console.log('examples >> ', examples);

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  if (isLoading || isFetching) {
    return (
      <>로딩중</>
    );
  }

  return (
    <>
      {isSuccess && (
        <div className={css.default}>{nihilTool.common.string(examples.data)}</div>
      )}
    </>
  );
}
