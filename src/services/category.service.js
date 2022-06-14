import { LSUtil } from "@/util/local-storage.util";
import { Category } from "@/models/category.model";

/**
 * @type {Category[]}
 * @const
 */
let categoryList = [new Category({ id: "2345325t632", name: "Todo list", isDefault: true, isSelected: true })];

const CATEGORY_LIST = "CATEGORY_LIST";

const getAll = () => {
  const categoryItems = LSUtil.get(CATEGORY_LIST) || [];
  categoryList = categoryItems.map((item) => new Category(item));
  return [...categoryList];
};

const findById = (categoryId) => {
  const categoryItems = LSUtil.get(CATEGORY_LIST) || [];
  categoryList = categoryItems.map((item) => new Category(item));
  console.log(categoryList)
  const foundItem = categoryList.find((item) => item.id === categoryId);
  return foundItem;
};

const add = (categoryItem) => {
  categoryList.push(categoryItem);
  LSUtil.set(CATEGORY_LIST, categoryList);
};

const update = (categoryItem) => {
  const indexOfCategoryToEdit = categoryList.findIndex((item) => item.id === categoryItem.id);
  categoryList[indexOfCategoryToEdit] = categoryItem;
  LSUtil.set(CATEGORY_LIST, categoryList);
};

const remove = (categoryItem) => {
  categoryList = categoryList.filter((item) => item.id !== categoryItem.id);
  LSUtil.set(CATEGORY_LIST, categoryList);
};

export const CategoryService = Object.freeze({ getAll, findById, add, update, remove });
