import { UserRole } from '@prisma/client';

export interface CreateUserDto {
  userEmail: string;
  userName: string;
  password: string;
  userRole: UserRole | string;
}

export interface UpdateUserDto {
  userEmail?: string;
  userName?: string;
  userRole?: UserRole | string;
}
