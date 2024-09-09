import { User } from '@prisma/client';
import { NextRequest } from 'next/server.js';
import { AuthTool, DB } from '@/src/utils';
import { UpdateUserDto } from '@/src/entities';
import { createResponse } from '@/src/utils/auth';

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

  return Response.json(createResponse<User>({
    resData: user,
    message: 'ok',
  }), {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const { user, ...updateUserDto }: UpdateUserDto = await req.json();

  const check = await AuthTool.expChecker(user);

  if (!check.resData) {
    return Response.json(createResponse<null>({
      resData: null,
      message: '로그인해야 합니다.',
    }), {
      status: 401,
    });
  }

  if ((check.resData.id !== params.id) && (check.resData.userRole !== 'ADMIN')) {
    return Response.json(createResponse<null>({
      resData: null,
      message: '회원 정보가 일치하지 않습니다.',
    }), {
      status: 401,
    });
  }

  const updateUser = await DB.users().update({
    where: {
      id: params.id,
    },
    data: updateUserDto,
  });

  return Response.json(createResponse<User>({
    resData: updateUser,
    message: 'ok',
  }), {
    status: 200,
  });
}

export async function DELETE(_: NextRequest, { params, }: Params) {
  const deleteUser = await DB.users().delete({
    where: {
      id: params.id,
    },
  });

  return Response.json(createResponse<User>({
    resData: deleteUser,
    message: 'ok',
  }), {
    status: 200,
  });
}
