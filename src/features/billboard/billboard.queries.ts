import db from '../../lib/db';

export async function createBillboardQuery(
  storeId: string,
  label: string,
  imageUrl: string
) {
  return await db.billboard.create({
    data: {
      storeId,
      label,
      imageUrl,
    },
  });
}

export async function getBillboardsQuery(userId: string, storeId: string) {
  return await db.billboard.findMany({
    where: {
      storeId,
      stores: {
        userId,
      },
    },
  });
}

export async function getBillboardQuery(userId: string, billboardId: string) {
  return await db.billboard.findUnique({
    where: {
      id: billboardId,
      stores: {
        userId,
      },
    },
  });
}

export async function updateBillboardQuery(
  userId: string,
  billboardId: string,
  label: string,
  imageUrl: string
) {
  try {
    return await db.billboard.update({
      where: {
        id: billboardId,
        stores: {
          userId,
        },
      },
      data: {
        label,
        imageUrl,
      },
    });
  } catch {
    return null;
  }
}

export async function deleteBillboardQuery(
  userId: string,
  billboardId: string
) {
  try {
    return await db.billboard.delete({
      where: {
        id: billboardId,
        stores: {
          userId,
        },
      },
    });
  } catch {
    return null;
  }
}
