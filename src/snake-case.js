import { assertString } from './utils/assert-string'

/** @param {string} string */
export const snakeCase = string => assertString(string)
  .replace(/(?!^)([A-Z]+(?![A-Z]+|$)|[-_.\s]+([a-zA-Z]+))/g, '_$1')
  .replace(/[-.\s]/g, '')
  .toLowerCase()

/** @param {Object} object */
export const snakeCaseKeys = object => Object.keys(object).reduce(
  (result, key) => Object.assign(result, { [snakeCase(key)]: object[key] }), {}
)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveSnakeCaseKeys = object => {
  if (
    object == null
    || typeof object !== 'object'
    || object instanceof Date
    || object instanceof RegExp
  ) return object

  if (Array.isArray(object)) {
    return object.map(value => recursiveSnakeCaseKeys(value))
  }

  return Object.keys(object).reduce((acc, key) => {
    acc[snakeCase(key)] = recursiveSnakeCaseKeys(object[key])

    return acc
  }, {})
}
