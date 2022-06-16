import { DOMUtil } from "@/util/dom.util";
import { generateId } from "@/util/generate-id.util";
import { VUtil } from "@/util/validation.util";
import { formatUtil } from "@/util/format.util";

export class Todo {
  id;
  content;
  categoryId;
  completed;
  createdAt;
  updatedAt;

  constructor({ id, content, completed, createdAt, updatedAt, categoryId }) {
    this.id = id;
    this.content = content;
    this.categoryId = categoryId;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({
    id = generateId(),
    content = "",
    completed = false,
    createdAt = new Date().getTime(),
    updatedAt = new Date().getTime(),
    categoryId = ""
  } = {}) {
    if (VUtil.isEmpty(content)) {
      throw new Error("Todo content cannot be empty.");
    }

    return new Todo({ id, content, completed, createdAt, updatedAt, categoryId });
  }

  updateContent(newContent) {
    if (VUtil.isEmpty(newContent)) {
      throw new Error("Todo content cannot be empty.");
    }

    this.content = newContent;
    this.updatedAt = new Date().getTime();
  }

  moveTo(categoryId) {
    this.categoryId = categoryId;
    this.updatedAt = new Date().getTime();
  }

  complete() {
    this.completed = true;
    this.updatedAt = new Date().getTime();
  }

  unComplete() {
    this.completed = false;
    this.updatedAt = new Date().getTime();
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

    const todoItemUpdatedAt = DOMUtil.createEl("small", { text: `updated ${formatUtil.formatRelativeDate(this.updatedAt)}` });

    todoItemTextDiv.appendChild(todoItemTextInput);
    todoItemTextDiv.appendChild(todoItemUpdatedAt);

    // create todo item actions
    const todoItemActionsDropdown = DOMUtil.createEl("div", { class: "three-dots" });
    todoItemActionsDropdown.classList.add("todo-item-actions-btn");
    todoItemActionsDropdown.classList.add("vertical");
    todoItemActionsDropdown.classList.add("dropdown");

    const todoItemActionsDropdownContent = DOMUtil.createEl("div", { class: "dropdown-content" });
    const todoItemActionsContainer = DOMUtil.createEl("div", { class: "todo-item-actions-container" });

    const todoEditBtn = DOMUtil.createEl("div", { class: "action-item", text: "Edit" });
    todoEditBtn.classList.add("todo-edit-btn");
    const todoDeleteBtn = DOMUtil.createEl("div", { class: "action-item", text: "Delete" });
    todoDeleteBtn.classList.add("todo-delete-btn");

    const todoMoveToBtn = DOMUtil.createEl("div", { class: "action-item", text: "Move to" });
    todoMoveToBtn.classList.add("todo-move-to-btn");
    todoMoveToBtn.classList.add("dropdown");

    const moveToDropdownContent = DOMUtil.createEl("div", { class: "dropdown-content" });
    moveToDropdownContent.classList.add("move-to-dropdown-content");
    const moveToDropdownItemsContainer = DOMUtil.createEl("div", {
      class: "move-to-dropdown-items-container"
    });

    todoMoveToBtn.appendChild(moveToDropdownContent);
    moveToDropdownContent.appendChild(moveToDropdownItemsContainer);

    todoItemActionsDropdownContent.appendChild(todoItemActionsContainer);
    todoItemActionsDropdown.appendChild(todoItemActionsDropdownContent);

    todoItemActionsContainer.appendChild(todoEditBtn);
    todoItemActionsContainer.appendChild(todoDeleteBtn);
    todoItemActionsContainer.appendChild(todoMoveToBtn);

    // combine elements
    todoEl.appendChild(checkboxLabel);
    todoEl.appendChild(todoItemTextDiv);
    todoEl.appendChild(todoItemActionsDropdown);

    return todoEl;
  }
}
