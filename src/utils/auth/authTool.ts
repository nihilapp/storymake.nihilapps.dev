import { nihilTool } from '@nihilapp/tools';
import { User } from '@prisma/client';
import { DB } from '@/src/utils';

type TokenMode = 'accessToken' | 'refreshToken';

export class AuthTool {
  static async compareToken(uid: string, savedToken: string) {
    const user = await DB.users().findFirst({
      where: {
        uid,
      },
    });

    console.log(user);

    return user.accessToken === savedToken;
  }

  static async tokenCheck(token: string, mode: TokenMode) {
    const secret = mode === 'accessToken'
      ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
      : process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET;

    const tokenInfo = await nihilTool.jwt.verifyToken(
      token,
      mode,
      secret
    );

    return nihilTool.jwt.isExpired(tokenInfo.exp);
  }

  static async genToken(user: User, mode: TokenMode) {
    const {
      uid, userEmail, userName, userRole,
    } = user;

    const secret = mode === 'accessToken'
      ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
      : process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET;

    const token = await nihilTool.jwt.createAccessToken({
      payload: {
        uid,
        userEmail,
        userName,
        userRole,
      },
      secret,
    });

    return token;
  }

  static async tokenStatus(user: User) {
    const compareToken = await this.compareToken(user.uid, user.accessToken);

    if (!compareToken) {
      return null;
    }

    const accessTokenCheck = await this.tokenCheck(user.accessToken, 'accessToken');
    const refreshTokenCheck = await this.tokenCheck(user.refreshToken, 'refreshToken');

    return {
      access: !accessTokenCheck,
      refresh: !refreshTokenCheck,
    };
  }

  static async expChecker(user: User) {
    const status = await this.tokenStatus(user);

    if (!status) {
      return {
        resData: null,
        message: '인증정보가 일치하지 않습니다.',
        status: 401,
      };
    }

    if ((status.refresh === true) && (status.access === true)) {
      return {
        resData: user,
        message: '토큰이 만료되지 않았습니다.',
        status: 200,
      };
    }

    if ((status.refresh === true) && (status.access === false)) {
      const accessToken = await this.genToken(user, 'accessToken');

      const newUser = await DB.users().update({
        where: {
          id: user.id,
        },
        data: {
          accessToken,
        },
      });

      return {
        resData: newUser,
        message: '액세스 토큰이 만료되어 재발급합니다.',
        status: 200,
      };
    }

    if ((status.refresh === false) && (status.access === false)) {
      return {
        resData: null,
        message: '리프레시 토큰이 만료되었습니다. 로그아웃됩니다.',
        status: 200,
      };
    }
  }
}
