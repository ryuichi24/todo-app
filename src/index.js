import {
  renderCategories,
  renderTodos,
  setupAddTodoForm,
  setupCategorySettingBtn,
  setupDefaultData
} from "@/app";
import "@/styles/main.css";

window.addEventListener("load", () => {
  setupDefaultData();
  setupAddTodoForm();
  setupCategorySettingBtn();
  renderCategories();
  renderTodos();
});

window.addEventListener("error", (event) => {
  alert(event.error?.message);
});
