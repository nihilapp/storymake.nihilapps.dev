import { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { nihilTool } from '@nihilapp/tools';
import { DB } from '@/src/utils';
import { CreateUserDto, CustomUser } from '@/src/entities';
import { createResponse } from '@/src/utils/auth';

export async function GET() {
  const users = await DB.users().findMany({
    select: {
      id: true,
      uid: true,
      userEmail: true,
      userName: true,
      userRole: true,
      created: true,
      updated: true,
      accessToken: true,
      refreshToken: true,
      Project: true,
      Character: true,
    },
  });

  return Response.json(createResponse<CustomUser[]>({
    resData: users,
    message: 'ok',
  }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const {
    userEmail, userName, userRole, password,
  }: CreateUserDto = await req.json();

  const hashedPassword = await nihilTool.bcrypt.dataToHash(password);

  const emailCheck = await DB.users().findFirst({
    where: {
      userEmail,
    },
  });

  const nameCheck = await DB.users().findFirst({
    where: {
      userName,
    },
  });

  if (emailCheck) {
    return Response.json({
      resData: null,
      message: '이미 존재하는 이메일입니다.',
    }, {
      status: 409,
    });
  }

  if (nameCheck) {
    return Response.json({
      resData: null,
      message: '이미 존재하는 닉네임입니다.',
    }, {
      status: 409,
    });
  }

  const newUser = await DB.users().create({
    data: {
      userEmail,
      userName,
      userRole,
      password: hashedPassword,
    },
  });

  newUser.password = null;

  return Response.json(createResponse<User>({
    resData: newUser,
    message: 'ok',
  }), {
    status: 201,
  });
}
