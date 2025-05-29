import { z } from 'zod';

export const color = z.object({
  name: z
    .string({ required_error: 'Please enter the color name.' })
    .trim()
    .min(1, { message: 'Please enter the color name.' }),
  value: z
    .string({ required_error: 'Please enter the color value.' })
    .trim()
    .min(1, { message: 'Please enter the color value.' }),
});
