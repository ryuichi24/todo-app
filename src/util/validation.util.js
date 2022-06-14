const isString = (value) => typeof value === "string";

const isObject = (value) => typeof value === "object";

const isEmpty = (value) => isString(value) && value.trim().length === 0;

export const VUtil = Object.freeze({ isString, isObject, isEmpty });
