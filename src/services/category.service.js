import { LSUtil } from "@/util/local-storage.util";
import { Category } from "@/models/category.model";

/**
 * @type {Category[]}
 * @const
 */
let categoryList = [];

const CATEGORY_LIST = "CATEGORY_LIST";

const getAll = () => {
  const categoryItems = LSUtil.get(CATEGORY_LIST) || [];
  categoryList = categoryItems.map((item) => new Category(item));
  return [...categoryList];
};

const findById = (categoryId) => {
  const categoryItems = LSUtil.get(CATEGORY_LIST) || [];
  categoryList = categoryItems.map((item) => new Category(item));
  const foundItem = categoryList.find((item) => item.id === categoryId);
  return foundItem;
};

const add = (categoryItem) => {
  categoryList.push(categoryItem);
  LSUtil.set(CATEGORY_LIST, categoryList);
};

const update = (categoryItem) => {
  if (categoryItem.isDefault) {
    throw new Error("Default category cannot be renamed.");
  }

  const indexOfCategoryToEdit = categoryList.findIndex((item) => item.id === categoryItem.id);
  categoryList[indexOfCategoryToEdit] = categoryItem;
  LSUtil.set(CATEGORY_LIST, categoryList);
};

const remove = (categoryItem) => {
  if (categoryItem.isDefault) {
    throw new Error("Default category cannot be deleted.");
  }

  categoryList = categoryList.filter((item) => item.id !== categoryItem.id);
  LSUtil.set(CATEGORY_LIST, categoryList);
};

export const CategoryService = Object.freeze({ getAll, findById, add, update, remove });
