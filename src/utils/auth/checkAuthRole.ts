import { User } from '@prisma/client';
import { AuthTool } from '@/src/utils';
import { createResponse } from '@/src/utils/auth/createResponse';

interface Params {
  id: number;
}

export async function checkAuthRole(
  user: User,
  params: Params
) {
  const check = await AuthTool.expChecker(user);

  if (!check.resData) {
    return {
      status: 401,
      response: createResponse<null>({
        resData: null,
        message: '로그인해야 합니다.',
      }),
    };
  }

  if ((check.resData.id !== params.id) && (check.resData.userRole !== 'ADMIN')) {
    return {
      status: 401,
      response: createResponse<null>({
        resData: null,
        message: '회원 정보가 일치하지 않습니다.',
      }),
    };
  }
}
