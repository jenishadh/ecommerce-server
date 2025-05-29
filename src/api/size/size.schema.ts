import { z } from 'zod';

export const size = z.object({
  name: z
    .string({ required_error: 'Please enter the size name.' })
    .trim()
    .min(1, { message: 'Please enter the size name.' }),
  value: z
    .string({ required_error: 'Please enter the size value.' })
    .trim()
    .min(1, { message: 'Please enter the size value.' }),
});
