import React from 'react';
import { Metadata } from 'next';
import { setMeta } from '@/hooks/setMeta';
import { WordChange } from '@/components/route/home';

export const metadata: Metadata = setMeta({
  title: '홈',
  url: '/',
});

export default function page() {
  return (
    <>
      <WordChange />
    </>
  );
}
