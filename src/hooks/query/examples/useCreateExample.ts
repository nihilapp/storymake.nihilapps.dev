import { useMutation } from '@tanstack/react-query';
import { CreateExample } from '@/src/entities';
import { ExampleQuery } from '@/src/features';

export function useCreateExample() {
  const query = useMutation({
    mutationFn: (createExample: CreateExample) => (
      ExampleQuery.create(createExample)
    ),
  });

  return query;
}
