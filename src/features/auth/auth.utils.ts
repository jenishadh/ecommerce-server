import jwt from 'jsonwebtoken';

import { decodedToken } from './auth.schema';
import { tokenConfig } from '../../config';
import { UnauthorizedError } from '../../lib/api-error';

export function generateAccessToken(userId: string) {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, tokenConfig.accessSecret as jwt.Secret, {
    expiresIn: tokenConfig.accessExpiry,
  });
}

export function generateRefreshToken(userId: string) {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, tokenConfig.refreshSecret as jwt.Secret, {
    expiresIn: tokenConfig.refreshExpiry,
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(
      token,
      tokenConfig.accessSecret as jwt.Secret
    ) as decodedToken;
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError('Invalid or expired access token!');
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(
      token,
      tokenConfig.refreshSecret as jwt.Secret
    ) as decodedToken;
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError('Invalid or expired refresh token!');
  }
}
