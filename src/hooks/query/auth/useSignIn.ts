import { useMutation } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features/query/auth.query';
import { SignInDto } from '@/src/entities';

export function useSignIn() {
  const query = useMutation({
    mutationFn: (signInDto: SignInDto) => (
      AuthQuery.signIn(signInDto)
    ),
  });

  return query;
}
