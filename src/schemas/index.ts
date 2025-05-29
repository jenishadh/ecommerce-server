import z from 'zod';

export const idSchema = (label: string) => {
  return z
    .string()
    .trim()
    .cuid({ message: `Invalid ${label} id!` })
    .min(25, { message: `Invalid ${label} id!` })
    .max(25, { message: `Invalid ${label} id!` });
};
