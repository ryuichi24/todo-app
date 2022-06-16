import { Category } from "@/models/category.model";
import { CategoryService } from "@/services/category.service";
import { DOMUtil } from "@/util/dom.util";
import { URLUtil } from "@/util/url.util";
import { Todo } from "@/models/todo.model";
import { TodoService } from "@/services/todo.service";

const DEFAULT_CATEGORY_ID = "1476719242328";

export const setupAddTodoForm = () => {
  const addTodoForm = DOMUtil.qs("#addTodoForm");

  addTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const children = event.target.elements;
    const addTodoContentInput = children["content"];
    const todoContent = addTodoContentInput.value;

    const { category } = URLUtil.parseURLParams(window.location.search);
    TodoService.add(Todo.create({ content: todoContent, categoryId: category }));

    event.target.reset();
    renderTodos();
  });
};

export const setupAddCategoryBtn = () => {
  const addCategoryBtn = DOMUtil.qs("#addCategoryBtn");
  addCategoryBtn.addEventListener("click", () => {
    const categoryName = window.prompt("Please enter category name.");
    CategoryService.add(Category.create({ name: categoryName }));
    renderCategories();
    renderTodos();
  });
};

export const setupCategorySettingBtn = () => {
  const categorySettingPanelCurtain = DOMUtil.qs("#categorySettingPanelCurtain");
  const categorySettingPanel = DOMUtil.qs("#categorySettingPanel");

  DOMUtil.qs("#categorySettingBtn").addEventListener("click", (event) => {
    if (categorySettingPanel.classList.contains("minimized")) {
      categorySettingPanelCurtain.classList.remove("deactive");
      categorySettingPanelCurtain.classList.add("active");
      categorySettingPanel.classList.remove("minimized");
      categorySettingPanel.classList.add("maximized");
    }
  });

  DOMUtil.qs("#categorySettingPanelCurtain").addEventListener("click", (event) => {
    categorySettingPanelCurtain.classList.add("deactive");
    categorySettingPanelCurtain.classList.remove("active");
    categorySettingPanel.classList.add("minimized");
    categorySettingPanel.classList.remove("maximized");
  });

  DOMUtil.qs("#categoryRenameBtn").addEventListener("click", (event) => {
    let { category } = URLUtil.parseURLParams(window.location.search);
    const categoryItem = CategoryService.findById(category);

    const newName = window.prompt("Please enter new name", categoryItem.name);

    categoryItem.updateName(newName);
    CategoryService.update(categoryItem);
    renderCategories();
    renderTodos();
  });

  DOMUtil.qs("#categoryDeleteBtn").addEventListener("click", (event) => {
    let { category } = URLUtil.parseURLParams(window.location.search);
    const categoryItem = CategoryService.findById(category);

    const isConfirmed = window.confirm("All todo items in this category will be deleted. Are you sure?");

    if (!isConfirmed) {
      return;
    }

    CategoryService.remove(categoryItem);
    const todosToDelete = TodoService.getAll(categoryItem.id);
    todosToDelete.forEach((item) => TodoService.remove(item));

    renderCategories();
    renderTodos();
  });

  DOMUtil.qs("#categoryDeleteAllCompletedBtn").addEventListener("click", (event) => {
    const isConfirmed = window.confirm("All completed todo items in this category will be deleted. Are you sure?");

    if (!isConfirmed) {
      return;
    }

    let { category } = URLUtil.parseURLParams(window.location.search);
    const completedTodos = TodoService.getAll(category).filter((item) => item.completed);
    completedTodos.forEach((item) => TodoService.remove(item));

    renderCategories();
    renderTodos();
  });
};

export const setupDefaultData = () => {
  const categoryItems = CategoryService.getAll();

  if (categoryItems.length === 0) {
    CategoryService.add(Category.create({ id: DEFAULT_CATEGORY_ID, name: "Todo list", isDefault: true }));
  }
};

export const renderCategories = () => {
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

export const renderTodos = () => {
  const notCompletedTodoList = DOMUtil.qs("#notCompletedTodoList");
  const completedTodoList = DOMUtil.qs("#completedTodoList");

  // clear old todos
  notCompletedTodoList.innerHTML = "";
  completedTodoList.innerHTML = "";

  let { category } = URLUtil.parseURLParams(window.location.search);

  TodoService.getAll(category).forEach((todoItem) => {
    const todoEl = todoItem.toElement();

    DOMUtil.qs(".complete-checkbox", todoEl).addEventListener("change", (event) => {
      event.target.checked ? todoItem.complete() : todoItem.unComplete();
      TodoService.update(todoItem);
      renderTodos();
    });

    const todoDateItems = DOMUtil.qsa(".todo-date-time", todoEl);
    todoDateItems.forEach((item) =>
      item.addEventListener("click", (event) => {
        todoDateItems.forEach((item) => {
          if (item.classList.contains("show")) {
            item.classList.remove("show");
          } else {
            item.classList.add("show");
          }
        });
      })
    );

    DOMUtil.qs(".todo-item-actions-btn", todoEl).addEventListener("click", (event) => {
      DOMUtil.qs(".dropdown-content", todoEl).classList.add("show");
    });

    window.addEventListener("click", (event) => {
      if (event.target.matches(".todo-item-actions-btn") || event.target.matches(".todo-move-to-btn")) return;
      DOMUtil.qs(".dropdown-content", todoEl).classList.remove("show");
      DOMUtil.qs(".move-to-dropdown-content", todoEl).classList.remove("show");
    });

    DOMUtil.qs(".todo-edit-btn", todoEl).addEventListener("click", (event) => {
      const todoItemTextInput = DOMUtil.qs(".todo-item-text-input", todoEl);
      todoItemTextInput.removeAttribute("readonly");
      todoItemTextInput.focus();

      todoItemTextInput.addEventListener("blur", (e) => {
        const todoContent = e.target.value;
        todoItemTextInput.setAttribute("readonly", true);
        todoItem.updateContent(todoContent);
        TodoService.update(todoItem);
        renderTodos();
      });
    });

    DOMUtil.qs(".todo-delete-btn", todoEl).addEventListener("click", (event) => {
      TodoService.remove(todoItem);
      renderTodos();
    });

    DOMUtil.qs(".todo-move-to-btn", todoEl).addEventListener("click", (event) => {
      DOMUtil.qs(".move-to-dropdown-content", todoEl).classList.add("show");
    });

    CategoryService.getAll().forEach((categoryItem) => {
      if (categoryItem.id === todoItem.categoryId) return;

      const categoryItemEl = DOMUtil.createEl("div", { class: "action-item", text: categoryItem.name });

      categoryItemEl.addEventListener("click", (event) => {
        todoItem.moveTo(categoryItem.id);
        TodoService.update(todoItem);
        renderTodos();
      });

      DOMUtil.qs(".move-to-dropdown-content", todoEl).appendChild(categoryItemEl);
    });

    if (!todoItem.completed) {
      notCompletedTodoList.appendChild(todoEl);
      return;
    }

    completedTodoList.appendChild(todoEl);
  });
};
