import { useQuery } from '@tanstack/react-query';
import { exampleKeys } from '@/src/data/query-keys';
import { ExampleQuery } from '@/src/features';

export function useGetExamples() {
  const query = useQuery({
    queryKey: exampleKeys.getAll,
    queryFn: ExampleQuery.getAll,
  });

  console.log('query >> ', query);

  return query;
}
