import { qs } from "@/util/dom.util";
import { Todo } from "@/models/todo.model";
import "@/styles/main.css";

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
    if (!todoItem.completed) {
      notCompletedTodoList.appendChild(todoItem.toElement());
      return;
    }

    completedTodoList.appendChild(todoItem.toElement());
  });
};
