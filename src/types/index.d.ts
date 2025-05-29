import z from 'zod';
import { Request } from 'express';

import { user as userSchema } from '../api/auth/auth.schema';

declare interface AuthenticatedRequest extends Request {
  user: z.infer<typeof userSchema>;
}
