import { User } from '@prisma/client';
import { AuthCheck, SignInDto } from '@/src/entities';
import { Api } from '@/src/utils';

export class AuthQuery {
  static async signIn(signInDto: SignInDto) {
    return Api.postQuery<User, SignInDto>(
      '/auth/signin',
      signInDto
    );
  }

  static async signOut(signOutDto: AuthCheck) {
    return Api.postQuery<null, AuthCheck>(
      '/auth/signout',
      signOutDto
    );
  }
}
