import { VUtil } from "@/util/validation.util";

/**
 * Get stored item already JSON parsed.
 * @param {string} key - key of the item
 * @returns {any}
 */
const get = (key) => {
  if (!_isKeyValid(key)) {
    throw new Error("Key is invalid or not provided.");
  }

  return JSON.parse(localStorage.getItem(key));
};

/**
 * Set item JSON stringified
 * @param {string} key - key of the item
 * @param {any} value - value of the item
 * @returns {void}
 */
const set = (key, value) => {
  if (!_isKeyValid(key)) {
    throw new Error("Key is invalid or not provided.");
  }

  if (VUtil.isObject(value)) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

function _isKeyValid(key) {
  if (!key || !VUtil.isString(key)) {
    return false;
  }

  return true;
}

export const LSUtil = Object.freeze({ get, set });
