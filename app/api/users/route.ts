import { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { nihilTool } from '@nihilapp/tools';
import { DB } from '@/src/utils';
import { ApiResponse, CreateUserDto } from '@/src/entities';

export async function GET() {
  const users = await DB.users().findMany();

  const response: ApiResponse<User[]> = {
    data: users,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const {
    userEmail, userName, userRole, password,
  }: CreateUserDto = await req.json();

  const hashedPassword = await nihilTool.bcrypt.dataToHash(password);

  const newUser = await DB.users().create({
    data: {
      userEmail,
      userName,
      userRole,
      password: hashedPassword,
    },
  });

  newUser.password = null;

  const response: ApiResponse<User> = {
    data: newUser,
    message: 'ok',
  };

  return Response.json(response, {
    status: 201,
  });
}
