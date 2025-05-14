import z from 'zod';

import db from '../../lib/db';
import { registerSchema, userSchema } from './auth.schema';

export async function createUser({
  name,
  email,
  password,
}: z.infer<typeof registerSchema>) {
  return await db.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({ where: { id } });
}

export async function getUserProfile(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  const { success, data } = userSchema.safeParse(user);
  return success ? data : null;
}

export async function updateRefreshToken(id: string, refreshToken: string) {
  return await db.user.update({
    where: { id },
    data: {
      refreshToken,
    },
  });
}
