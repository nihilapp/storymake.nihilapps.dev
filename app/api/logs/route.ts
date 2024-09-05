import { NextRequest } from 'next/server';
import { Log } from '@prisma/client';
import { DB } from '@/src/utils';
import { ApiResponse, CreateLogDto } from '@/src/entities';

export async function GET() {
  const logs = await DB.logs().findMany();

  const response: ApiResponse<Log[]> = {
    data: logs,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const createLogDto: CreateLogDto = await req.json();

  const newLog = await DB.logs().create({
    data: createLogDto,
  });

  const response: ApiResponse<Log> = {
    data: newLog,
    message: 'ok',
  };

  return Response.json(response, {
    status: 201,
  });
}
