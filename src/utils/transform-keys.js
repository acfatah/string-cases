/**
 * @param {Object} object
 * @param {Function} transformer
 */
export const transformKeys = (object, transformer) => Object.keys(object).reduce(
  (result, key) => Object.assign(result, { [transformer(key)]: object[key] }), {}
)
