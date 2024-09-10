import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '@/src/data/query-keys';
import { UsersQuery } from '@/src/features';

export function useGetUserByName(name: string) {
  const query = useQuery({
    queryKey: usersKeys.getByName(name),
    queryFn: () => UsersQuery.getByName(name),
    enabled: !!name,
  });

  return query;
}
