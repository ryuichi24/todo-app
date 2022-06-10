/**
 * A shorthand function of querySelector
 * @param selector - selector of the selected element
 * @param parent - parent DOM object (optional)
 */
export const qs = (selector, parent = document) => {
  return parent.querySelector(selector);
};

/**
 * A shorthand function of querySelectorAll
 * @param selector - selector of the selected element
 * @param parent - parent DOM object (optional)
 */
export const qsa = (selector, parent = document) => {
  return [...parent.querySelectorAll(selector)];
};

/**
 * A utility function of createElement
 * @param type - tag name of the element
 * @param options - attributes of the element
 */
export const createEl = (type, options = {}) => {
  const element = document.createElement(type);
  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      element.classList.add(value);
      return;
    }

    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
      return;
    }

    if (key === "text") {
      element.textContent = value;
      return;
    }

    element.setAttribute(key, value);
  });

  return element;
};
