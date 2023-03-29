import { assertString } from './utils/assert-string'

/** @param {string|null} string */
export const camelCase = string => assertString(string)
  .toLowerCase()
  .replace(/([-_.\s][a-z0-9])/g, char => char[1].toUpperCase())

/** @param {Object} object */
export const camelCaseKeys = object => Object.keys(object).reduce(
  (result, key) => Object.assign(result, { [camelCase(key)]: object[key] }), {}
)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveCamelCaseKeys = object => {
  if (
    object == null
    || typeof object !== 'object'
    || object instanceof Date
    || object instanceof RegExp
  ) return object

  if (Array.isArray(object)) {
    return object.map(value => recursiveCamelCaseKeys(value))
  }

  return Object.keys(object).reduce((acc, key) => {
    acc[camelCase(key)] = recursiveCamelCaseKeys(object[key])

    return acc
  }, {})
}
