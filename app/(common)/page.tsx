import React from 'react';
import { Metadata } from 'next';
import { setMeta } from '@/src/utils';
import { HomeContent } from '@/src/components';

export const metadata: Metadata = setMeta({
  title: '홈',
  url: '/',
});

export default function IndexPage() {
  return (
    <HomeContent />
  );
}
