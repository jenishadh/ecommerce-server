import db from '../../lib/db';

export async function createSizeQuery(
  name: string,
  value: string,
  storeId: string
) {
  return await db.size.create({
    data: {
      name,
      value,
      storeId,
    },
  });
}

export async function getSizesQuery(userId: string, storeId: string) {
  return await db.size.findMany({
    where: {
      storeId,
      store: {
        userId,
      },
    },
  });
}

export async function getSizeQuery(userId: string, sizeId: string) {
  return await db.size.findUnique({
    where: {
      id: sizeId,
      store: {
        userId,
      },
    },
  });
}

export async function updateSizeQuery(
  userId: string,
  sizeId: string,
  name: string,
  value: string
) {
  return await db.size.update({
    where: {
      id: sizeId,
      store: {
        userId,
      },
    },
    data: {
      name,
      value,
    },
  });
}

export async function deleteSizeQuery(userId: string, sizeId: string) {
  return await db.size.delete({
    where: {
      id: sizeId,
      store: {
        userId,
      },
    },
  });
}
