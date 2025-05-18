import z from 'zod';

export const labelSchema = z
  .string()
  .trim()
  .min(2, { message: 'Please enter a billboard label.' });

export const storeIdSchema = z
  .string()
  .trim()
  .cuid({ message: 'Invalid store id!' })
  .min(25, { message: 'Invalid store id!' })
  .max(25, { message: 'Invalid store id!' });

export const billboardIdSchema = z
  .string()
  .trim()
  .cuid({ message: 'Invalid billboard id!' })
  .min(25, { message: 'Invalid billboard id!' })
  .max(25, { message: 'Invalid billboard id!' });
