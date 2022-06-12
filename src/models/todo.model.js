import { createEl } from "@/util/dom.util";

export class Todo {
  content;
  completed;
  createdAt;

  constructor({ content = "", completed = false, createdAt = new Date().getTime() } = {}) {
    this.content = content;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  toElement() {
    const todoEl = createEl("li", {
      class: "todo-item"
    });

    if (this.completed) {
      todoEl.classList.add("completed");
    }

    // create checkbox
    const checkboxLabel = createEl("label");
    const checkbox = createEl("input", { type: "checkbox" });
    const roundCheckbox = createEl("span", { class: "round-checkbox" });

    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(roundCheckbox);

    // create todo item text
    const todoItemTextDiv = createEl("div", { class: "todo-item-text" });
    const todoItemTextInput = createEl("input", {
      type: "text",
      name: "todoItemText",
      readonly: true,
      value: this.content
    });

    todoItemTextDiv.appendChild(todoItemTextInput);

    // create todo item actions
    const todoItemActionsDiv = createEl("div", { class: "todo-item-actions" });
    const todoEditBtn = createEl("button", { class: "edit", text: "Edit" });
    const todoDeleteBtn = createEl("button", { class: "delete", text: "Delete" });
    todoItemActionsDiv.appendChild(todoEditBtn);
    todoItemActionsDiv.appendChild(todoDeleteBtn);

    // combine elements
    todoEl.appendChild(checkboxLabel);
    todoEl.appendChild(todoItemTextDiv);
    todoEl.appendChild(todoItemActionsDiv);

    return todoEl;
  }
}
