import { NextRequest } from 'next/server.js';
import { DB } from '@/src/utils';
import { tokenCheck } from '@/src/utils/auth';
import { ApiResponse, AuthCheck } from '@/src/entities';

export async function POST(req: NextRequest) {
  const signOutDto: AuthCheck = await req.json();

  const isTokenCheck = tokenCheck(signOutDto);

  if (isTokenCheck) {
    await DB.users().update({
      where: {
        uid: signOutDto.uid,
      },
      data: {
        accessToken: null,
      },
    });

    const response: ApiResponse<null> = {
      data: null,
      message: 'ok',
    };

    return Response.json(response, {
      status: 200,
    });
  } else {
    const response: ApiResponse<null> = {
      data: null,
      message: '인증에 실패했습니다.',
    };

    return Response.json(response, {
      status: 401,
    });
  }
}
