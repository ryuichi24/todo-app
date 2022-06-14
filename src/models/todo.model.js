import { DOMUtil } from "@/util/dom.util";
import { generateId } from "@/util/generate-id.util";

export class Todo {
  id;
  content;
  categoryId;
  completed;
  createdAt;

  constructor({
    id = generateId(),
    content = "",
    completed = false,
    createdAt = new Date().getTime(),
    categoryId = ""
  } = {}) {
    this.id = id;
    this.content = content;
    this.categoryId = categoryId;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  /**
   * convert todo object to HTMLElement
   * @return {HTMLElement}
   */
  toElement() {
    const todoEl = DOMUtil.createEl("li", {
      class: "todo-item",
      dataset: { id: this.id }
    });

    if (this.completed) {
      todoEl.classList.add("completed");
    }

    // create checkbox
    const checkboxLabel = DOMUtil.createEl("label");
    const checkbox = DOMUtil.createEl("input", { class: "complete-checkbox", type: "checkbox" });
    checkbox.checked = this.completed;
    const roundCheckbox = DOMUtil.createEl("span", { class: "round-checkbox" });

    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(roundCheckbox);

    // create todo item text
    const todoItemTextDiv = DOMUtil.createEl("div", { class: "todo-item-text" });
    const todoItemTextInput = DOMUtil.createEl("input", {
      type: "text",
      name: "todoItemText",
      class: "todo-item-text-input",
      readonly: true,
      value: this.content
    });

    todoItemTextDiv.appendChild(todoItemTextInput);

    // create todo item actions
    const todoItemActionsDiv = DOMUtil.createEl("div", { class: "todo-item-actions" });
    const todoEditBtn = DOMUtil.createEl("button", { class: "edit", text: "Edit" });
    const todoDeleteBtn = DOMUtil.createEl("button", { class: "delete", text: "Delete" });
    todoItemActionsDiv.appendChild(todoEditBtn);
    todoItemActionsDiv.appendChild(todoDeleteBtn);

    // combine elements
    todoEl.appendChild(checkboxLabel);
    todoEl.appendChild(todoItemTextDiv);
    todoEl.appendChild(todoItemActionsDiv);

    return todoEl;
  }
}
