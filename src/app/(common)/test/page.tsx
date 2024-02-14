import React from 'react';
import { setMeta } from '@/hooks/setMeta';
import { supaClient } from '@/utils/supabase';
import { Nihil } from '@/utils/nihil';
import { SignInButton } from '@/components/route/test';

export const metadata = setMeta({
  title: '',
  url: '',
});

async function getTemplates() {
  const templates = await supaClient.from('templates').select('*');

  return templates;
}

export default async function TestPage() {
  const templates = await getTemplates();

  return (
    <>
      <div>{Nihil.string(templates)}</div>
      <SignInButton />
    </>
  );
}
