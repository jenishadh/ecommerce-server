import { Store, Billboard, Category, Color, Size } from '../generated/prisma';

import * as Error from '../lib/api-error';

export async function findEntity(
  userId: string,
  id: string,
  getEntity: (
    userId: string,
    id: string
  ) => Promise<Store | Billboard | Category | Color | Size | null>,
  label: string
) {
  const result = await getEntity(userId, id);
  if (!result) {
    throw new Error.NotFoundError(`${label} not found!`);
  }
  return result;
}
