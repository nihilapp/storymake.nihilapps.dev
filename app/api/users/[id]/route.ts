import { User } from '@prisma/client';
import { NextRequest } from 'next/server.js';
import { DB } from '@/src/utils';
import { ApiResponse, UpdateUserDto } from '@/src/entities';

interface Params {
  params: {
    id: number;
  }
}

export async function GET(_: NextRequest, { params, }: Params) {
  const user = await DB.users().findFirst({
    where: {
      id: params.id,
    },
  });

  const response: ApiResponse<User> = {
    data: user,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const updateUserDto: UpdateUserDto = await req.json();

  const updateUser = await DB.users().update({
    where: {
      id: params.id,
    },
    data: updateUserDto,
  });

  const response: ApiResponse<User> = {
    data: updateUser,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function DELETE(_: NextRequest, { params, }: Params) {
  const deleteUser = await DB.users().delete({
    where: {
      id: params.id,
    },
  });

  const response: ApiResponse<User> = {
    data: deleteUser,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}
