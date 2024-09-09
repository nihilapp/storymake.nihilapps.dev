import { useMutation } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features';
import { SignInDto } from '@/src/entities';

export function useAdminSignIn() {
  const query = useMutation({
    mutationFn: (signInDto: SignInDto) => (
      AuthQuery.adminSignIn(signInDto)
    ),
  });

  return query;
}
