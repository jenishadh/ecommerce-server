import { JwtPayload } from 'jsonwebtoken';
import { z } from 'zod';

const email = z
  .string()
  .email({ message: 'Please enter a valid email.' })
  .trim();

const password = z
  .string()
  .min(8, { message: 'Must be at least 8 characters long' })
  .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
  .regex(/[0-9]/, { message: 'Contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Contain at least one special character.',
  })
  .trim();

export const loginSchema = z.object({
  email: email,
  password: z.string().min(1, { message: 'Please enter your password' }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name' }).trim(),
  email: email,
  password: password,
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(['USER', 'ADMIN']),
  image: z.string().nullable(),
});

export interface decodedToken extends JwtPayload {
  payload: {
    id: string;
  };
}
