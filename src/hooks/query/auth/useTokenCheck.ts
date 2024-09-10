import { useMutation } from '@tanstack/react-query';
import { User } from '@prisma/client';
import { AuthQuery } from '@/src/features';

export function useTokenCheck() {
  const query = useMutation({
    mutationFn: (user: User) => (
      AuthQuery.tokenCheck(user)
    ),
  });

  return query;
}
