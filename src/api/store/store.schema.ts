import { z } from 'zod';

export const store = z.object({
  name: z
    .string({ required_error: 'Please enter the store name.' })
    .trim()
    .min(1, { message: 'Please enter the store name.' }),
});
