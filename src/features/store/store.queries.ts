import db from '../../lib/db';

export async function createStoreQuery(userId: string, name: string) {
  return await db.store.create({
    data: {
      name,
      userId,
    },
  });
}

export async function getStoresQuery(userId: string) {
  return await db.store.findMany({
    where: {
      userId,
    },
  });
}

export async function getStoreQuery(userId: string, storeId: string) {
  return await db.store.findUnique({
    where: {
      id: storeId,
      userId,
    },
  });
}

export async function updateStoreQuery(
  userId: string,
  storeId: string,
  name: string
) {
  return await db.store.update({
    where: {
      id: storeId,
      userId,
    },
    data: {
      name,
    },
  });
}

export async function deleteStoreQuery(userId: string, storeId: string) {
  return await db.store.delete({
    where: {
      id: storeId,
      userId,
    },
  });
}
