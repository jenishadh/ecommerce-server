import { Request, Response, NextFunction } from 'express';
import z from 'zod';

import { UnauthorizedError } from '../lib/api-error';
import { userSchema } from '../features/auth/auth.schema';
import { getUserProfile } from '../features/auth/auth.queries';
import { verifyAccessToken } from '../features/auth/auth.utils';

declare module 'express' {
  interface Request {
    user?: z.infer<typeof userSchema>;
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new UnauthorizedError('Access token not found!');
    }

    const payload = verifyAccessToken(accessToken);
    if (!payload) {
      throw new UnauthorizedError('Invalid access token!');
    }

    const user = await getUserProfile(payload.id);
    if (!user) {
      throw new UnauthorizedError('Invalid access token!');
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError('Invalid access token!');
  }
}
