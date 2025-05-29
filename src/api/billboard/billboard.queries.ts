import db from '../../lib/db';

export async function createBillboard(
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

export async function getBillboardsById(userId: string, storeId: string) {
  return await db.billboard.findMany({
    where: {
      storeId,
      store: {
        userId,
      },
    },
  });
}

export async function getBillboardById(userId: string, billboardId: string) {
  return await db.billboard.findUnique({
    where: {
      id: billboardId,
      store: {
        userId,
      },
    },
  });
}

export async function updateBillboard(
  userId: string,
  billboardId: string,
  label: string,
  imageUrl: string
) {
  return await db.billboard.update({
    where: {
      id: billboardId,
      store: {
        userId,
      },
    },
    data: {
      label,
      imageUrl,
    },
  });
}

export async function deleteBillboard(userId: string, billboardId: string) {
  return await db.billboard.delete({
    where: {
      id: billboardId,
      store: {
        userId,
      },
    },
  });
}
