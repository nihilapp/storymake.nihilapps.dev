import { User } from '@prisma/client';
import { Api } from '@/src/utils';
import { CreateUserDto, UpdateUserDto } from '@/src/entities';

export class UsersQuery {
  static async getAll() {
    return Api.getQuery<User[]>('/users');
  }

  static async getById(id: number) {
    return Api.getQuery<User>(`/users/${id}`);
  }

  static async getByEmail(email: string) {
    return Api.getQuery<User>(`/users/email/${email}`);
  }

  static async getByName(name: string) {
    return Api.getQuery<User>(`/users/name/${name}`);
  }

  static async create(createUserDto: CreateUserDto) {
    return Api.postQuery<User, CreateUserDto>(
      '/users',
      createUserDto
    );
  }

  static async update(id: number, updateUserDto: UpdateUserDto) {
    return Api.patchQuery<User, UpdateUserDto>(
      `/users/${id}`,
      updateUserDto
    );
  }

  static async delete(id: number) {
    return Api.deleteQuery<User>(`/users/${id}`);
  }
}
