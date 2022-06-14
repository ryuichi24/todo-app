import { LSUtil } from "@/util/local-storage.util";
import { Todo } from "@/models/todo.model";

/**
 * @type {Todo[]}
 * @const
 */
let todoList = [];

const TODO_LIST = "TODO_LIST";

const getAll = (categoryId) => {
  const todoItems = LSUtil.get(TODO_LIST) || [];
  todoList = todoItems.map((item) => new Todo(item));
  return [...todoList.filter((item) => item.categoryId === categoryId)];
};

const add = (todoItem) => {
  todoList.push(todoItem);
  LSUtil.set(TODO_LIST, todoList);
};

const update = (todoItem) => {
  const indexOfTodoToEdit = todoList.findIndex((item) => item.id === todoItem.id);
  todoList[indexOfTodoToEdit] = todoItem;
  LSUtil.set(TODO_LIST, todoList);
};

const remove = (todoItem) => {
  todoList = todoList.filter((item) => item.id !== todoItem.id);
  LSUtil.set(TODO_LIST, todoList);
};

export const TodoService = Object.freeze({ getAll, add, update, remove });
