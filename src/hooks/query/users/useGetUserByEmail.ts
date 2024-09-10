import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '@/src/data/query-keys';
import { UsersQuery } from '@/src/features';

export function useGetUserByEmail(email: string) {
  const query = useQuery({
    queryKey: usersKeys.getByEmail(email),
    queryFn: () => UsersQuery.getByEmail(email),
    enabled: !!email,
  });

  return query;
}
