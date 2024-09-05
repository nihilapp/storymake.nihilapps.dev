import { UserRole } from '@prisma/client';

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

export interface AuthCheck {
  uid: string;
  accessToken: string;
  refreshToken: string;
}
