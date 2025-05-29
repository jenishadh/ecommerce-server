import db from '../../lib/db';

export async function createCategory(name: string, storeId: string) {
  return await db.category.create({
    data: {
      name,
      storeId,
    },
  });
}

export async function getCategoriesById(userId: string, storeId: string) {
  return await db.category.findMany({
    where: {
      storeId,
      store: {
        userId,
      },
    },
  });
}

export async function getCategoryById(userId: string, categoryId: string) {
  return await db.category.findUnique({
    where: {
      id: categoryId,
      store: {
        userId,
      },
    },
  });
}

export async function updateCategory(
  userId: string,
  categoryId: string,
  name: string
) {
  return await db.category.update({
    where: {
      id: categoryId,
      store: {
        userId,
      },
    },
    data: {
      name,
    },
  });
}

export async function deleteCategory(userId: string, categoryId: string) {
  return await db.category.delete({
    where: {
      id: categoryId,
      store: {
        userId,
      },
    },
  });
}
