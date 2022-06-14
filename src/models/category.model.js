import { DOMUtil } from "@/util/dom.util";
import { generateId } from "@/util/generate-id.util";

export class Category {
  id;
  name;
  isSelected;
  isDefault;

  constructor({ id = generateId(), name = "", isSelected = false, isDefault = false } = {}) {
    this.id = id;
    this.name = name;
    this.isSelected = isSelected;
    this.isDefault = isDefault;
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
