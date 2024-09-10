import { NextRequest } from 'next/server';
import { nihilTool } from '@nihilapp/tools';
import { User } from '@prisma/client';
import { SignInDto } from '@/src/entities';
import { AuthTool, DB } from '@/src/utils';
import { createResponse } from '@/src/utils/auth';

export async function POST(req: NextRequest) {
  const signInDto: SignInDto = await req.json();

  const findUser = await DB.users().findFirst({
    where: {
      userEmail: signInDto.userEmail,
    },
  });

  if (!findUser) {
    return Response.json(createResponse<null>({
      resData: null,
      message: '존재하지 않는 사용자입니다.',
    }), {
      status: 400,
    });
  }

  if (findUser.userRole !== 'ADMIN') {
    return Response.json(createResponse<null>({
      resData: null,
      message: '관리자 계정이 아닙니다.',
    }), {
      status: 401,
    });
  }

  const passwordCompare = nihilTool.bcrypt.dataCompare(
    findUser.password,
    signInDto.password
  );

  if (!passwordCompare) {
    return Response.json(createResponse<null>({
      resData: null,
      message: '비밀번호가 일치하지 않습니다.',
    }), {
      status: 401,
    });
  }

  const refreshToken = await AuthTool.genToken(findUser, 'refreshToken');
  const accessToken = await AuthTool.genToken(findUser, 'accessToken');

  const updatedUser = await DB.users().update({
    where: {
      id: findUser.id,
    },
    data: {
      accessToken,
      refreshToken,
    },
  });

  updatedUser.password = null;

  return Response.json(createResponse<User>({
    resData: updatedUser,
    message: 'ok',
  }), {
    status: 200,
  });
}
