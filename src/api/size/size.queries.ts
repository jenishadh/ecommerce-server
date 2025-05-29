import db from '../../lib/db';

export async function createSize(name: string, value: string, storeId: string) {
  return await db.size.create({
    data: {
      name,
      value,
      storeId,
    },
  });
}

export async function getSizesById(userId: string, storeId: string) {
  return await db.size.findMany({
    where: {
      storeId,
      store: {
        userId,
      },
    },
  });
}

export async function getSizeById(userId: string, sizeId: string) {
  return await db.size.findUnique({
    where: {
      id: sizeId,
      store: {
        userId,
      },
    },
  });
}

export async function updateSize(
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

export async function deleteSize(userId: string, sizeId: string) {
  return await db.size.delete({
    where: {
      id: sizeId,
      store: {
        userId,
      },
    },
  });
}
