import { User } from '@prisma/client';
import { NextRequest } from 'next/server.js';
import { nihilTool } from '@nihilapp/tools';
import { DB } from '@/src/utils';
import { DeleteUserDto, UpdateUserDto } from '@/src/entities';
import { checkAuthRole, createResponse } from '@/src/utils/auth';

interface Params {
  params: {
    id: number;
  }
}

export async function GET(
  _: NextRequest,
  { params, }: Params
) {
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

export async function PATCH(
  req: NextRequest,
  { params, }: Params
) {
  const {
    user, password, newPassword, ...updateUserDto
  }: UpdateUserDto = await req.json();

  const authCheck = await checkAuthRole(
    user,
    params
  );

  if (authCheck.status !== 200) {
    return Response.json(authCheck.response, {
      status: authCheck.status,
    });
  }

  if (password) {
    const findAuth = await DB.auth().findFirst({
      where: {
        userId: user.id,
      },
    });

    const passwordCheck = await nihilTool.bcrypt.dataCompare(
      findAuth.password,
      password
    );

    if (!passwordCheck) {
      return createResponse<null>({
        resData: null,
        message: '현재 비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
      });
    }

    const hashedNewPassword = await nihilTool.bcrypt.dataToHash(newPassword);

    await DB.auth().update({
      where: {
        userId: user.id,
      },
      data: {
        password: hashedNewPassword,
      },
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

  await DB.auth().delete({
    where: {
      userId: deleteUser.id,
    },
  });

  return Response.json(createResponse<User>({
    resData: deleteUser,
    message: 'ok',
  }), {
    status: 200,
  });
}
