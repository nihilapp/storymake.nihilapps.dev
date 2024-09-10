import { useMutation } from '@tanstack/react-query';
import { DeleteUserDto } from '@/src/entities';
import { UsersQuery } from '@/src/features';

export function useDeleteUser(id: number) {
  if (!id) {
    return;
  }

  const query = useMutation({
    mutationFn: (deleteUserDto: DeleteUserDto) => (
      UsersQuery.delete(id, deleteUserDto)
    ),
  });

  return query;
}
