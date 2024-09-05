import { Log } from '@prisma/client';
import { CreateLogDto } from '@/src/entities';
import { Api } from '@/src/utils';

export class LogsQuery {
  static async create(createLogDto: CreateLogDto) {
    return Api.postQuery<Log, CreateLogDto>(
      '/logs',
      createLogDto
    );
  }
}
