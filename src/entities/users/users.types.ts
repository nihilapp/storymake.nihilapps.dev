import { User, UserRole } from '@prisma/client';

export interface CreateUserDto {
  userEmail: string;
  userName: string;
  password: string;
  userRole: UserRole;
}

export interface UpdateUserDto {
  user: User;
  userEmail?: string;
  userName?: string;
  userRole?: UserRole;
}
