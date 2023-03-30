/** @param {Object} object */
export const objectWithInvalidKeys = object =>
  typeof object !== 'object' ||
  object == null ||
  object instanceof Date ||
  object instanceof RegExp
