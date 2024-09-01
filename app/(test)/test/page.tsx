import React from 'react';
import { setMeta } from '@/src/utils';
import { ExampleCreate, ExampleList } from '@/src/components';

export const metadata = setMeta({
  title: '테스트 페이지',
  url: '/test',
});

export default function page() {
  return (
    <>
      <ExampleList />
      <ExampleCreate />
    </>
  );
}
