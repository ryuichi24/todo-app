import { Category } from "@/models/category.model";
import { CategoryService } from "@/services/category.service";
import { DOMUtil } from "@/util/dom.util";
import { URLUtil } from "@/util/url.util";
import { Todo } from "@/models/todo.model";
import { TodoService } from "@/services/todo.service";
import { VUtil } from "@/util/validation.util";
import "@/styles/main.css";

const DEFAULT_CATEGORY_ID = "1476719242328";

window.addEventListener("load", () => {
  setupDefaultData();
  setupAddTodoForm();
  renderCategories();
  renderTodos();
});

window.addEventListener("error", (event) => {
  alert(event.error?.message);
});

const setupAddTodoForm = () => {
  const addTodoForm = DOMUtil.qs("#addTodoForm");

  addTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const children = event.target.elements;
    const addTodoContentInput = children["content"];
    const todoContent = addTodoContentInput.value;

    if (VUtil.isEmpty(todoContent)) {
      throw new Error("Please enter todo content.");
    }

    const { category } = URLUtil.parseURLParams(window.location.search);

    const todo = new Todo({ content: todoContent, categoryId: category });
    TodoService.add(todo);

    event.target.reset();
    renderTodos();
  });
};

const setupAddCategoryBtn = () => {
  const addCategoryBtn = DOMUtil.qs("#addCategoryBtn");
  addCategoryBtn.addEventListener("click", () => {
    const categoryName = window.prompt("Please enter category name.");

    if (VUtil.isEmpty(categoryName)) {
      throw new Error("Category name cannot be empty.");
    }

    CategoryService.add(new Category({ name: categoryName }));
    renderCategories();
  });
};

const setupDefaultData = () => {
  const categoryItems = CategoryService.getAll();

  if (categoryItems.length === 0) {
    const defaultCategory = new Category({ id: DEFAULT_CATEGORY_ID, name: "Todo list", isDefault: true });
    CategoryService.add(defaultCategory);
  }
};

const renderCategories = () => {
  const categoryListEl = DOMUtil.qs("#categoryList");

  // clear old category
  categoryListEl.innerHTML = `
    <li id="addCategoryBtn" class="category-item">+ New list</li>
  `;

  setupAddCategoryBtn();

  CategoryService.getAll().forEach((item) => {
    const categoryItemEl = item.toElement();

    categoryItemEl.addEventListener("click", (event) => {
      DOMUtil.qsa(".category-item").forEach((item) => item.classList.remove("selected"));
      event.target.classList.add("selected");
      URLUtil.appendURLParam("category", item.id);
      renderTodos();
    });

    categoryListEl.appendChild(categoryItemEl);
  });

  let { category } = URLUtil.parseURLParams(window.location.search);
  const foundCategory = CategoryService.findById(category);

  if (!foundCategory) {
    URLUtil.appendURLParam("category", DEFAULT_CATEGORY_ID);
    category = DEFAULT_CATEGORY_ID;
  }

  DOMUtil.qs(`[data-category-id="${category}"]`).classList.add("selected");
};

const renderTodos = () => {
  const notCompletedTodoList = DOMUtil.qs("#notCompletedTodoList");
  const completedTodoList = DOMUtil.qs("#completedTodoList");

  // clear old todos
  notCompletedTodoList.innerHTML = "";
  completedTodoList.innerHTML = "";

  let { category } = URLUtil.parseURLParams(window.location.search);

  TodoService.getAll(category).forEach((todoItem) => {
    const todoEl = todoItem.toElement();

    DOMUtil.qs(".complete-checkbox", todoEl).addEventListener("change", (event) => {
      todoItem.completed = event.target.checked;
      TodoService.update(todoItem);
      renderTodos();
    });

    DOMUtil.qs(".edit", todoEl).addEventListener("click", (event) => {
      const todoItemTextInput = DOMUtil.qs(".todo-item-text-input", todoEl);
      todoItemTextInput.removeAttribute("readonly");
      todoItemTextInput.focus();

      todoItemTextInput.addEventListener("blur", (e) => {
        const todoContent = e.target.value;

        if (VUtil.isEmpty(todoContent)) {
          renderTodos();
          throw new Error("Todo content cannot be empty.");
        }

        todoItemTextInput.setAttribute("readonly", true);

        todoItem.content = todoContent;
        TodoService.update(todoItem);
        renderTodos();
      });
    });

    DOMUtil.qs(".delete", todoEl).addEventListener("click", (event) => {
      TodoService.remove(todoItem);
      renderTodos();
    });

    if (!todoItem.completed) {
      notCompletedTodoList.appendChild(todoEl);
      return;
    }

    completedTodoList.appendChild(todoEl);
  });
};
