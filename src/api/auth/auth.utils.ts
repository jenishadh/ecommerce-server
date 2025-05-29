import jwt from 'jsonwebtoken';

import * as Schema from './auth.schema';
import * as Config from '../../config';
import * as Error from '../../lib/api-error';

export function generateAccessToken(userId: string) {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, Config.token.accessSecret as jwt.Secret, {
    expiresIn: Config.token.accessExpiry,
  });
}

export function generateRefreshToken(userId: string) {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, Config.token.refreshSecret as jwt.Secret, {
    expiresIn: Config.token.refreshExpiry,
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(
      token,
      Config.token.accessSecret as jwt.Secret
    ) as Schema.decodedToken;
  } catch (error) {
    console.log(error);
    throw new Error.UnauthorizedError('Invalid or expired access token!');
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(
      token,
      Config.token.refreshSecret as jwt.Secret
    ) as Schema.decodedToken;
  } catch (error) {
    console.log(error);
    throw new Error.UnauthorizedError('Invalid or expired refresh token!');
  }
}
