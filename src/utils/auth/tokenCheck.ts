import { nihilTool } from '@nihilapp/tools';
import { AuthCheck, TokenPayload } from '@/src/entities';
import { DB } from '@/src/utils';

export async function tokenCheck(user: AuthCheck) {
  const { uid, accessToken, refreshToken, } = user;

  // 액세스 토큰 체크
  const isAccessTokenInfo = await nihilTool
    .jwt.verifyToken<TokenPayload>(
      accessToken,
      'accessToken',
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
    );

  const isAccessTokenExpire = nihilTool.jwt.isExpired(isAccessTokenInfo.exp);

  if (isAccessTokenExpire) {
    return false;
  }

  // 리프레시 토큰 체크
  const isRefreshTokenInfo = await nihilTool
    .jwt.verifyToken<TokenPayload>(
      refreshToken,
      'refreshToken',
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET
    );

  const isRefreshTokenExpire = nihilTool.jwt.isExpired(isRefreshTokenInfo.exp);

  // 리프레시 토큰 만료 되었으면 로그아웃
  if (isRefreshTokenExpire) {
    return false;
  }

  // 리프레시 토큰 만료 안되었으면 액세스 토큰 재발급
  if (!isRefreshTokenExpire) {
    const findUser = await DB.users().findFirst({
      where: {
        uid,
      },
    });

    const newAccessToken = await nihilTool.jwt.createAccessToken<TokenPayload>({
      payload: {
        uid,
        userEmail: findUser.userEmail,
        userName: findUser.userName,
        userRole: findUser.userRole,
      },
      secret: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
    });

    await DB.users().update({
      where: {
        uid,
      },
      data: {
        accessToken: newAccessToken,
      },
    });

    return true;
  }
}
