import { NextRequest } from 'next/server.js';
import { AuthTool, DB } from '@/src/utils';
import { SignOutDto } from '@/src/entities';
import { createResponse } from '@/src/utils/auth';

export async function POST(req: NextRequest) {
  const signOutDto: SignOutDto = await req.json();

  const check = await AuthTool.expChecker(signOutDto.user);

  if (!check.resData) {
    return Response.json(createResponse<null>({
      resData: null,
      message: '인증정보가 일치하지 않거나 이미 로그아웃 상태입니다.',
    }), {
      status: 401,
    });
  }

  await DB.users().update({
    where: {
      uid: signOutDto.user.uid,
    },
    data: {
      accessToken: null,
    },
  });

  return Response.json(createResponse<null>({
    resData: null,
    message: '로그아웃되었습니다.',
  }), {
    status: 200,
  });
}
