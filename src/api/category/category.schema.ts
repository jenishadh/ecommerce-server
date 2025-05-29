import { z } from 'zod';

export const category = z.object({
  name: z
    .string({ required_error: 'Please enter the category name.' })
    .trim()
    .min(1, { message: 'Please enter the category name.' }),
});
