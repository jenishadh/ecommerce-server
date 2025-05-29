import { type ZodSchema } from 'zod';

import * as Error from '../lib/api-error';

export function validateId(schema: ZodSchema, id: string | undefined) {
  const result = schema.safeParse(id);
  if (!result.success) {
    throw new Error.BadRequestError(result.error?.errors[0]?.message);
  }
  return result.data;
}

export function validateSchema(schema: ZodSchema, data: object | undefined) {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.log(result.error?.errors);

    throw new Error.BadRequestError(result.error?.errors[0]?.message);
  }
  return result.data;
}
