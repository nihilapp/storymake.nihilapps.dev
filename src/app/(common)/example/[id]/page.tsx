import React from 'react';
import { setMeta } from '@/hooks/setMeta';
import { prismaUser } from '@/utils/prisma';

async function getUserById(id: string) {
  return prismaUser.findFirst({
    where: {
      id,
    },
  });
}

interface Props {
  params: {
    id: string;
  }
}

export const generateMetadata = ({ params, }: Props) => setMeta({
  title: '내 정보',
  url: `/example/${params.id}`,
});

export default async function UserDetailPage({ params, }: Props) {
  const user = await getUserById(params.id);

  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </>
  );
}
