import { NextRequest } from 'next/server.js';
import { nihilTool } from '@nihilapp/tools';
import { User } from '@prisma/client';
import { ApiResponse, SignInDto, TokenPayload } from '@/src/entities';
import { DB } from '@/src/utils';

export async function POST(req: NextRequest) {
  const signInDto: SignInDto = await req.json();

  const findUser = await DB.users().findFirst({
    where: {
      userEmail: signInDto.userEmail,
    },
  });

  if (!findUser) {
    return Response.json({
      data: null,
      message: '존재하지 않는 계정입니다.',
    }, {
      status: 400,
    });
  }

  const passwordCheck = await nihilTool.bcrypt.dataCompare(
    findUser.password,
    signInDto.password
  );

  if (!passwordCheck) {
    return Response.json({
      data: null,
      message: '비밀번호가 일치하지 않습니다.',
    }, {
      status: 401,
    });
  }

  const accessToken = await nihilTool.jwt.createAccessToken<TokenPayload>({
    payload: {
      uid: findUser.uid,
      userEmail: findUser.userEmail,
      userName: findUser.userName,
      userRole: findUser.userRole,
    },
    secret: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
  });

  const refreshToken = await nihilTool.jwt.createRefreshToken<TokenPayload>({
    payload: {
      uid: findUser.uid,
      userEmail: findUser.userEmail,
      userName: findUser.userName,
      userRole: findUser.userRole,
    },
    secret: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET,
  });

  const signInUser = await DB.users().update({
    where: {
      id: findUser.id,
    },
    data: {
      accessToken,
      refreshToken,
    },
  });

  signInUser.password = null;

  const response: ApiResponse<User> = {
    data: signInUser,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}
