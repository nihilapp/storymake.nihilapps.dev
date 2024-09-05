import { useMutation } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features/query/auth.query';
import { AuthCheck } from '@/src/entities';

export function useSignOut() {
  const query = useMutation({
    mutationFn: (signOutDto: AuthCheck) => (
      AuthQuery.signOut(signOutDto)
    ),
  });

  return query;
}
