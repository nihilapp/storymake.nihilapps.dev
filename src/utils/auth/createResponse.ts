import { ApiResponse } from '@/src/entities';

export function createResponse<T>(res: ApiResponse<T>) {
  return res;
}
