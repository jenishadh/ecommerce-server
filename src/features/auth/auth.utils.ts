import jwt from 'jsonwebtoken';

import { decodedToken } from './auth.schema';
import {
  accessTokenExpiresIn,
  accessTokenSecret,
  refreshTokenExpiresIn,
  refreshTokenSecret,
} from '../../config';

export function generateAccessToken(userId: string) {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, accessTokenSecret as jwt.Secret, {
    expiresIn: accessTokenExpiresIn,
  });
}

export function generateRefreshToken(userId: string) {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, refreshTokenSecret as jwt.Secret, {
    expiresIn: refreshTokenExpiresIn,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessTokenSecret as jwt.Secret) as decodedToken;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshTokenSecret as jwt.Secret) as decodedToken;
}
