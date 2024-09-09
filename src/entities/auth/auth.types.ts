import { User, UserRole } from '@prisma/client';

export interface SignInDto {
  userEmail: string;
  password: string;
}

export interface TokenPayload {
  uid: string;
  userEmail: string;
  userName: string;
  userRole: UserRole;
}

export interface SignOutDto {
  user: User;
}

export interface AuthCheck {
  user: User;
}

export interface TokenStatus {
  accessTokenStatus: boolean;
  refreshTokenStatus: boolean;
}
