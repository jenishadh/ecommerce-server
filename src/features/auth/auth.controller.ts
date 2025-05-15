import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { loginSchema, registerSchema } from './auth.schema';
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateRefreshToken,
} from './auth.queries';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './auth.utils';
import {
  BadRequestError,
  InternalError,
  UnauthorizedError,
} from '../../lib/api-error';
import { asyncHandler } from '../../lib/async-handler';

// POST /api/v1/auth/register - Register new user
export const register = asyncHandler(async (req: Request, res: Response) => {
  const validatedFields = registerSchema.safeParse(req.body);
  if (!validatedFields.success) {
    throw new BadRequestError('Invalid fields!');
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new BadRequestError('User already exists! Please login.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });
  if (!user) {
    throw new InternalError('Failed to create user!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'User created successfully!',
    },
  });
});

// POST /api/v1/auth/login - Login user
export const login = asyncHandler(async (req: Request, res: Response) => {
  const validatedFields = loginSchema.safeParse(req.body);
  if (!validatedFields.success) {
    throw new BadRequestError('Invalid fields!');
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    throw new BadRequestError('Invalid credentials!');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestError('Invalid credentials!');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  const response = await updateRefreshToken(user.id, refreshToken);
  if (!response) {
    throw new InternalError('Failed to update refresh token!');
  }

  const securityOptions = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie('accessToken', accessToken, securityOptions)
    .cookie('refreshToken', refreshToken, securityOptions)
    .json({
      success: true,
      data: {
        message: 'Login successful!',
      },
    });
});

// POST /api/v1/auth/refresh - Refresh access token
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token not found!');
  }

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    throw new UnauthorizedError('Invalid refresh token!');
  }

  const user = await getUserById(payload.id);
  if (!user) {
    throw new UnauthorizedError('Invalid refresh token!');
  }

  if (user.refreshToken !== refreshToken) {
    throw new UnauthorizedError('Invalid refresh token!');
  }

  const accessToken = generateAccessToken(user.id);
  const securityOptions = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie('accessToken', accessToken, securityOptions)
    .json({
      success: true,
      data: {
        message: 'Access token refreshed successfully!',
      },
    });
});

// POST /api/v1/auth/logout - Logout user
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({
      success: true,
      data: {
        message: 'Logout successful!',
      },
    });
});
