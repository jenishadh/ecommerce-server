import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import * as Query from './auth.queries';
import * as Utility from './auth.utils';
import * as Schema from './auth.schema';
import * as Error from '../../lib/api-error';

import { asyncHandler } from '../../lib/async-handler';

// POST /api/v1/auth/register - Register new user
export const register = asyncHandler(async (req: Request, res: Response) => {
  const validatedFields = Schema.register.safeParse(req.body);
  if (!validatedFields.success) {
    throw new Error.BadRequestError('Invalid fields!');
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await Query.getUserByEmail(email);
  if (existingUser) {
    throw new Error.BadRequestError('User already exists! Please login.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Query.createUser({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    data: {
      message: 'User created successfully!',
    },
  });
});

// POST /api/v1/auth/login - Login user
export const login = asyncHandler(async (req: Request, res: Response) => {
  const validatedFields = Schema.login.safeParse(req.body);
  if (!validatedFields.success) {
    throw new Error.BadRequestError('Invalid fields!');
  }

  const { email, password } = validatedFields.data;

  const user = await Query.getUserByEmail(email);
  if (!user || !user.password) {
    throw new Error.BadRequestError('Invalid credentials!');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error.BadRequestError('Invalid credentials!');
  }

  const accessToken = Utility.generateAccessToken(user.id);
  const refreshToken = Utility.generateRefreshToken(user.id);
  await Query.updateRefreshToken(user.id, refreshToken);

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
    throw new Error.UnauthorizedError('Refresh token not found!');
  }

  const payload = Utility.verifyRefreshToken(refreshToken);

  const user = await Query.getUserById(payload.id);
  if (!user) {
    throw new Error.UnauthorizedError('User not found!');
  }

  if (user.refreshToken !== refreshToken) {
    throw new Error.UnauthorizedError('Invalid refresh token!');
  }

  const accessToken = Utility.generateAccessToken(user.id);
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
