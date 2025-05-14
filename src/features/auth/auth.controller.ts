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

// POST /api/v1/auth/register - Register a new user
export async function register(req: Request, res: Response) {
  try {
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
    await createUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.log(error);
    throw new InternalError('Failed to create user!');
  }
}

// POST /api/v1/auth/login - Login a user
export async function login(req: Request, res: Response) {
  try {
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
    await updateRefreshToken(user.id, refreshToken);

    const securityOptions = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie('accessToken', accessToken, securityOptions)
      .cookie('refreshToken', refreshToken, securityOptions)
      .json({ message: 'Login successful!' });
  } catch (error) {
    console.log(error);
    throw new InternalError('Failed to login user');
  }
}

// POST /api/v1/auth/refresh - Refresh access token
export async function refresh(req: Request, res: Response) {
  try {
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
      .json({ message: 'Login successful!' });
  } catch (error) {
    console.log(error);
    throw new InternalError('Failed to refresh token');
  }
}

// POST /api/v1/auth/logout - Logout a user
export async function logout(req: Request, res: Response) {
  res
    .status(200)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({ message: 'Logout successful!' });
}
