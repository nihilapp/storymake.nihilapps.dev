import { QueryKeys } from '@/src/entities';

export const exampleKeys: QueryKeys<number> = {
  getAll: [ 'getAllExamples', ],
  getById: (id) => [ 'getExampleById', id, ],
};
