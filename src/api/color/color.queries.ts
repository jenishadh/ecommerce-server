import db from '../../lib/db';

export async function createColor(
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

export async function getColorsById(userId: string, storeId: string) {
  return await db.color.findMany({
    where: {
      storeId,
      store: {
        userId,
      },
    },
  });
}

export async function getColorById(userId: string, colorId: string) {
  return await db.color.findUnique({
    where: {
      id: colorId,
      store: {
        userId,
      },
    },
  });
}

export async function updateColor(
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

export async function deleteColor(userId: string, colorId: string) {
  return await db.color.delete({
    where: {
      id: colorId,
      store: {
        userId,
      },
    },
  });
}
