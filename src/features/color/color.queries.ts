import db from '../../lib/db';

export async function createColorQuery(
  name: string,
  value: string,
  storeId: string
) {
  return await db.color.create({
    data: {
      name,
      value,
      storeId,
    },
  });
}

export async function getColorsQuery(userId: string, storeId: string) {
  return await db.color.findMany({
    where: {
      storeId,
      store: {
        userId,
      },
    },
  });
}

export async function getColorQuery(userId: string, colorId: string) {
  return await db.color.findUnique({
    where: {
      id: colorId,
      store: {
        userId,
      },
    },
  });
}

export async function updateColorQuery(
  userId: string,
  colorId: string,
  name: string,
  value: string
) {
  return await db.color.update({
    where: {
      id: colorId,
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

export async function deleteColorQuery(userId: string, colorId: string) {
  return await db.color.delete({
    where: {
      id: colorId,
      store: {
        userId,
      },
    },
  });
}
