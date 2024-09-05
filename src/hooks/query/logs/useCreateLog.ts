import { useMutation } from '@tanstack/react-query';
import { CreateLogDto } from '@/src/entities';
import { LogsQuery } from '@/src/features/query/logs.query';

export function useCreateLog() {
  const query = useMutation({
    mutationFn: (createLogDto: CreateLogDto) => (
      LogsQuery.create(createLogDto)
    ),
  });

  return query;
}
