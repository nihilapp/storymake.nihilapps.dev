import {
  Character, Project, User, UserRole
} from '@prisma/client';

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
  password?: string;
  newPassword?: string;
}

export interface DeleteUserDto {
  user: User;
}

export interface CustomUser {
  id: number;
  uid: string;
  userEmail: string;
  userName: string;
  userRole: UserRole;
  created: Date;
  updated: Date;
  accessToken: string;
  refreshToken: string;
  password?: string;
  Project: Project[];
  Character: Character[];
}
