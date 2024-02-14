import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { setMeta } from '@/hooks/setMeta';
import { prismaUser } from '@/utils/prisma';
import { Nihil } from '@/utils/nihil';

export const metadata: Metadata = setMeta({
  title: '예시',
  url: '/example',
});

async function getUsers() {
  const users = await prismaUser.findMany();

  return users;
}

export default async function ExamplePage() {
  const users = await getUsers();

  return (
    <>
      <div>
        {users.map((user) => (
          <div key={Nihil.uuid(0)}>
            <Link href={`/example/${user.id}`}>{user.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
