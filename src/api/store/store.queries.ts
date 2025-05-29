import db from '../../lib/db';

export async function createStore(userId: string, name: string) {
  return await db.store.create({
    data: {
      name,
      userId,
    },
  });
}

export async function getStoresById(userId: string) {
  return await db.store.findMany({
    where: {
      userId,
    },
  });
}

export async function getStoreById(userId: string, storeId: string) {
  return await db.store.findUnique({
    where: {
      id: storeId,
      userId,
    },
  });
}

export async function updateStore(
  userId: string,
  storeId: string,
  name: string
) {
  return await db.store.update({
    where: {
      id: storeId,
      userId: userId,
    },
    data: {
      name,
    },
  });
}

export async function deleteStore(userId: string, storeId: string) {
  return await db.store.delete({
    where: {
      id: storeId,
      userId,
    },
  });
}
