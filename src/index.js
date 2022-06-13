import { qs } from "@/util/dom.util";
import { Todo } from "@/models/todo.model";
import "@/styles/main.css";

/**
 * @type {Todo[]}
 * @const
 */
let todoList = [];
const TODO_LIST = "todoList";

window.addEventListener("load", () => {
  setupAddTodoForm();
  fetchTodos();
  renderTodos();
});

const fetchTodos = () => {
  const todoItems = JSON.parse(localStorage.getItem(TODO_LIST)) || [];
  todoList = todoItems.map((item) => new Todo(item));
};

const setupAddTodoForm = () => {
  const addTodoForm = qs("#addTodoForm");

  addTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const children = event.target.elements;
    const addTodoContentInput = children["content"];

    const todo = new Todo({ content: addTodoContentInput.value });

    todoList.push(todo);

    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));

    event.target.reset();

    renderTodos();
  });
};

const renderTodos = () => {
  const notCompletedTodoList = qs("#notCompletedTodoList");
  const completedTodoList = qs("#completedTodoList");

  // clear old todos
  notCompletedTodoList.innerHTML = "";
  completedTodoList.innerHTML = "";

  todoList.forEach((todoItem) => {
    const todoEl = todoItem.toElement();

    qs(".complete-checkbox", todoEl).addEventListener("change", (event) => {
      const indexOfTodoToEdit = todoList.findIndex((item) => item.id === todoItem.id);
      todoList[indexOfTodoToEdit].completed = event.target.checked;
      localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
      renderTodos();
    });

    qs(".edit", todoEl).addEventListener("click", (event) => {
      const todoItemTextInput = qs(".todo-item-text-input", todoEl);
      todoItemTextInput.removeAttribute("readonly");
      todoItemTextInput.focus();

      todoItemTextInput.addEventListener("blur", (e) => {
        todoItemTextInput.setAttribute("readonly", true);
        const indexOfTodoToEdit = todoList.findIndex((item) => item.id === todoItem.id);
        todoList[indexOfTodoToEdit].content = e.target.value;
        localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
        renderTodos();
      });
    });

    qs(".delete", todoEl).addEventListener("click", (event) => {
      todoList = todoList.filter((item) => item.id !== todoItem.id);
      localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
      renderTodos();
    });

    if (!todoItem.completed) {
      notCompletedTodoList.appendChild(todoEl);
      return;
    }

    completedTodoList.appendChild(todoEl);
  });
};
