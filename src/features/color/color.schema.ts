import z from 'zod';

export const nameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Please enter the color name.' });

export const valueSchema = z
  .string()
  .trim()
  .min(7, { message: 'Please enter the hex color value.' })
  .max(7, { message: 'Please enter the hex color value.' });

export const storeIdSchema = z
  .string()
  .trim()
  .cuid({ message: 'Invalid store id!' })
  .min(25, { message: 'Invalid store id!' })
  .max(25, { message: 'Invalid store id!' });

export const colorIdSchema = z
  .string()
  .trim()
  .cuid({ message: 'Invalid color id!' })
  .min(25, { message: 'Invalid color id!' })
  .max(25, { message: 'Invalid color id!' });
