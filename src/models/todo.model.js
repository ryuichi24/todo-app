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
    const todoItemActionsDropdown = DOMUtil.createEl("div", { class: "three-dots", id: "todoItemActionsBtn" });
    todoItemActionsDropdown.classList.add("vertical");
    todoItemActionsDropdown.classList.add("dropdown");
    const todoItemActionsDropdownContent = DOMUtil.createEl("div", { class: "dropdown-content" });

    const todoItemActionsContainer = DOMUtil.createEl("div", { class: "todo-item-actions-container" });

    const todoEditBtn = DOMUtil.createEl("div", { class: "action-item", text: "Edit", id: "todoEditBtn" });
    const todoDeleteBtn = DOMUtil.createEl("div", { class: "action-item", text: "Delete", id: "todoDeleteBtn" });
    todoItemActionsContainer.appendChild(todoEditBtn);
    todoItemActionsContainer.appendChild(todoDeleteBtn);

    todoItemActionsDropdownContent.appendChild(todoItemActionsContainer);

    todoItemActionsDropdown.appendChild(todoItemActionsDropdownContent);

    // combine elements
    todoEl.appendChild(checkboxLabel);
    todoEl.appendChild(todoItemTextDiv);
    todoEl.appendChild(todoItemActionsDropdown);

    return todoEl;
  }
}
