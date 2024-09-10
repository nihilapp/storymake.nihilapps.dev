import { User } from '@prisma/client';
import { NextRequest } from 'next/server.js';
import { DB } from '@/src/utils';
import { DeleteUserDto, UpdateUserDto } from '@/src/entities';
import { checkAuthRole, createResponse } from '@/src/utils/auth';

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

  user.password = null;

  return Response.json(createResponse<User>({
    resData: user,
    message: 'ok',
  }), {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const { user, ...updateUserDto }: UpdateUserDto = await req.json();

  const authCheck = await checkAuthRole(
    user,
    params
  );

  if (authCheck.status !== 200) {
    return Response.json(authCheck.response, {
      status: authCheck.status,
    });
  }

  const updateUser = await DB.users().update({
    where: {
      id: params.id,
    },
    data: updateUserDto,
  });

  updateUser.password = null;

  return Response.json(createResponse<User>({
    resData: updateUser,
    message: 'ok',
  }), {
    status: 200,
  });
}

export async function DELETE(
  req: NextRequest,
  { params, }: Params
) {
  const { user, }: DeleteUserDto = await req.json();

  const authCheck = await checkAuthRole(
    user,
    params
  );

  if (authCheck.status !== 200) {
    return Response.json(authCheck.response, {
      status: authCheck.status,
    });
  }

  const deleteUser = await DB.users().delete({
    where: {
      id: params.id,
    },
  });

  deleteUser.password = null;

  return Response.json(createResponse<User>({
    resData: deleteUser,
    message: 'ok',
  }), {
    status: 200,
  });
}
