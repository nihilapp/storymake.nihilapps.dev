import { User } from '@prisma/client';
import { SignInDto, SignOutDto, TokenStatus } from '@/src/entities';
import { Api } from '@/src/utils';

export class AuthQuery {
  static async signIn(signInDto: SignInDto) {
    return Api.postQuery<User, SignInDto>(
      '/auth/signin',
      signInDto
    );
  }

  static async signOut(signOutDto: SignOutDto) {
    return Api.postQuery<null, SignOutDto>(
      '/auth/signout',
      signOutDto
    );
  }

  static async adminSignIn(signInDto: SignInDto) {
    return Api.postQuery<User, SignInDto>(
      '/admin/auth/signin',
      signInDto
    );
  }

  static async tokenCheck(user: User) {
    return Api.postQuery<TokenStatus, User>(
      '/auth/token_check',
      user
    );
  }
}
