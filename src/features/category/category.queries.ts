import db from '../../lib/db';

export async function createCategoryQuery(name: string, storeId: string) {
  return await db.category.create({
    data: {
      name,
      storeId,
    },
  });
}

export async function getCategoriesQuery(userId: string, storeId: string) {
  return await db.category.findMany({
    where: {
      storeId,
      stores: {
        userId,
      },
    },
  });
}

export async function getCategoryQuery(userId: string, categoryId: string) {
  return await db.category.findUnique({
    where: {
      id: categoryId,
      stores: {
        userId,
      },
    },
  });
}

export async function updateCategoryQuery(
  userId: string,
  categoryId: string,
  name: string
) {
  try {
    return await db.category.update({
      where: {
        id: categoryId,
        stores: {
          userId,
        },
      },
      data: {
        name,
      },
    });
  } catch {
    return null;
  }
}

export async function deleteCategoryQuery(userId: string, categoryId: string) {
  try {
    return await db.category.delete({
      where: {
        id: categoryId,
        stores: {
          userId,
        },
      },
    });
  } catch {
    return null;
  }
}
