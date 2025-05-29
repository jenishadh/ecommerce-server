import { Response, NextFunction } from 'express';
import z from 'zod';

import * as Error from '../lib/api-error';

import { AuthenticatedRequest } from '../types';
import { user as userSchema } from '../api/auth/auth.schema';
import { getUserProfile } from '../api/auth/auth.queries';
import { verifyAccessToken } from '../api/auth/auth.utils';

declare module 'express-serve-static-core' {
  interface Request {
    user: z.infer<typeof userSchema>;
  }
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return next(new Error.UnauthorizedError('Access token not found!'));
    }

    const payload = verifyAccessToken(accessToken);

    const user = await getUserProfile(payload.id);
    if (!user) {
      return next(new Error.UnauthorizedError('User not found!'));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
