import { Example } from '@prisma/client';
import { CreateExample, UpdateExample } from '@/src/entities';
import { Api } from '@/src/utils';

export class ExampleQuery {
  static async getAll() {
    const { data, } = await Api.get<Example[]>('/examples');

    return data;
  }

  static async getById(id: number) {
    const { data, } = await Api.get<Example>(`/examples/${id}`);

    return data;
  }

  static async create(createExample: CreateExample) {
    const { data, } = await Api.post<Example, CreateExample>(
      `/examples`,
      createExample
    );

    return data;
  }

  static async update(id: number, updateExample: UpdateExample) {
    const { data, } = await Api.patch<Example, UpdateExample>(
      `/examples/${id}`,
      updateExample
    );

    return data;
  }

  static async delete(id: number) {
    const { data, } = await Api.delete<Example>(`/examples/${id}`);

    return data;
  }
}
