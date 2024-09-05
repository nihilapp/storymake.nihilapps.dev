import { NextRequest } from 'next/server';
import { Log } from '@prisma/client';
import { DB } from '@/src/utils';
import { ApiResponse } from '@/src/entities';

interface Params {
  params: {
    id: number;
  }
}

export async function GET(_: NextRequest, { params, }: Params) {
  const log = await DB.logs().findFirst({
    where: {
      id: params.id,
    },
  });

  const response: ApiResponse<Log> = {
    data: log,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}
