import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '@/src/data/query-keys';
import { UsersQuery } from '@/src/features';

export function useGetUserById(id: number) {
  const query = useQuery({
    queryKey: usersKeys.getById(id),
    queryFn: () => UsersQuery.getById(id),
    enabled: !!id,
  });

  return query;
}
