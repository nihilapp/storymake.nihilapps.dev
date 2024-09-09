import { NextRequest } from 'next/server';
import { AuthCheck, TokenStatus } from '@/src/entities';
import { AuthTool } from '@/src/utils';
import { createResponse } from '@/src/utils/auth';

export async function POST(req:NextRequest) {
  const authCheck: AuthCheck = await req.json();

  const check = await AuthTool.tokenStatus(authCheck.user);

  if (!check) {
    return Response.json(createResponse<null>({
      resData: null,
      message: '인증정보가 일치하지 않습니다.',
    }), {
      status: 401,
    });
  }

  return Response.json(createResponse<TokenStatus>({
    resData: {
      accessTokenStatus: check.access,
      refreshTokenStatus: check.refresh,
    },
    message: 'ok',
  }), {
    status: 200,
  });
}
