import { NextRequest } from 'next/server.js';
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
      message: '존재하지 않는 계정입니다.',
    }), {
      status: 400,
    });
  }

  const findAuth = await DB.auth().findFirst({
    where: {
      userId: findUser.id,
    },
  });

  const passwordCheck = await nihilTool.bcrypt.dataCompare(
    findAuth.password,
    signInDto.password
  );

  if (!passwordCheck) {
    return Response.json(createResponse<null>({
      resData: null,
      message: '비밀번호가 일치하지 않습니다.',
    }), {
      status: 401,
    });
  }

  const refreshToken = await AuthTool.genToken(findUser, 'refreshToken');
  const accessToken = await AuthTool.genToken(findUser, 'accessToken');

  const signInUser = await DB.users().update({
    where: {
      id: findUser.id,
    },
    data: {
      accessToken,
      refreshToken,
    },
  });

  return Response.json(createResponse<User>({
    resData: signInUser,
    message: 'ok',
  }), {
    status: 200,
  });
}
