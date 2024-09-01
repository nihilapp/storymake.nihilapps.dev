import React from 'react';
import { setMeta } from '@/src/utils';

interface Props {
  //
}

export const metadata = setMeta({
  title: '',
  url: '',
});

export default function page() {
  return (
    <>
      <div>auth</div>
    </>
  );
}
