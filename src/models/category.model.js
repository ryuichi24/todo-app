import { DOMUtil } from "@/util/dom.util";
import { generateId } from "@/util/generate-id.util";
import { VUtil } from "@/util/validation.util";

export class Category {
  id;
  name;
  isSelected;
  isDefault;
  createdAt;
  updatedAt;

  constructor({ id, name, isSelected, isDefault, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.isSelected = isSelected;
    this.isDefault = isDefault;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({
    id = generateId(),
    name = "",
    isSelected = false,
    isDefault = false,
    createdAt = new Date().getTime(),
    updatedAt = new Date().getTime()
  } = {}) {
    if (VUtil.isEmpty(name)) {
      throw new Error("Category name cannot be empty.");
    }

    return new Category({ id, name, isSelected, isDefault, createdAt, updatedAt });
  }

  updateName(newName) {
    if (VUtil.isEmpty(newName)) {
      throw new Error("Category name cannot be empty.");
    }

    this.name = newName;
    this.updatedAt = new Date().getTime();
  }

  /**
   * convert category object to HTMLElement
   * @return {HTMLElement}
   */
  toElement() {
    const categoryItemEl = DOMUtil.createEl("li", {
      class: "category-item",
      text: this.name,
      dataset: { categoryId: this.id }
    });

    if (this.isSelected) {
      categoryItemEl.classList.add("selected");
    }

    return categoryItemEl;
  }
}
