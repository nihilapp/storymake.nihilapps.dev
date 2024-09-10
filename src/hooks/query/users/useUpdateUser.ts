import { useMutation } from '@tanstack/react-query';
import { UpdateUserDto } from '@/src/entities';
import { UsersQuery } from '@/src/features';

export function useUpdateUser(id: number) {
  if (!id) {
    return;
  }

  const query = useMutation({
    mutationFn: (updateUserDto: UpdateUserDto) => (
      UsersQuery.update(id, updateUserDto)
    ),
  });

  return query;
}
