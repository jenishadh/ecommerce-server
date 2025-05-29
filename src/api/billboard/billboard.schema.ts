import { z } from 'zod';

export const billboard = z.object({
  label: z
    .string({ required_error: 'Please enter the billboard label.' })
    .trim()
    .min(1, { message: 'Please enter the billboard label.' }),
});
