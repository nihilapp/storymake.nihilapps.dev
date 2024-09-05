import { QueryKeys } from '@/src/entities';

export const usersKeys: QueryKeys<number> = {
  getAll: [ 'getUsers', ],
  getById: (id: number) => [ 'getUserById', id, ],
  getByName: (name: string) => [ 'getUserByName', name, ],
};
