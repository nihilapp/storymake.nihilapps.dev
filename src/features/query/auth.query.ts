import { User } from '@prisma/client';
import { SignInDto, SignOutDto } from '@/src/entities';
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
}
