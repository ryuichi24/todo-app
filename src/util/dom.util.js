/**
 * A shorthand function of querySelector
 * @param {string} selector - selector of the selected element
 * @param {Document | Window} parent - parent DOM object (optional)
 * @returns {Element}
 */
const qs = (selector, parent = document) => {
  return parent.querySelector(selector);
};

/**
 * A shorthand function of querySelectorAll
 * @param {string} selector - selector of the selected element
 * @param {Document | Window} parent - parent DOM object (optional)
 * @return {Array.<Element>}
 */
const qsa = (selector, parent = document) => {
  return [...parent.querySelectorAll(selector)];
};

/**
 * A utility function of createElement
 * @param {string} type - tag name of the element
 * @param {{id: string, class: string, text: string, dataset: { [string]:string }}} options - attributes of the element
 * @return {HTMLElement}
 */
const createEl = (type, options = {}) => {
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

export const DOMUtil = Object.freeze({ qs, qsa, createEl });
