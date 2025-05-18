import z from 'zod';

export const nameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Please enter the category name.' });

export const storeIdSchema = z
  .string()
  .trim()
  .cuid({ message: 'Invalid store id!' })
  .min(25, { message: 'Invalid store id!' })
  .max(25, { message: 'Invalid store id!' });

export const categoryIdSchema = z
  .string()
  .trim()
  .cuid({ message: 'Invalid category id!' })
  .min(25, { message: 'Invalid category id!' })
  .max(25, { message: 'Invalid category id!' });
