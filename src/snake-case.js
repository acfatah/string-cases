import { assertString } from './utils/assert-string'
import { objectWithInvalidKeys } from './utils/object-with-invalid-keys'
import { transformKeys } from './utils/transform-keys'

/** @param {string} string */
export const snakeCase = string => assertString(string)
  .replace(/(?!^)([A-Z]+(?![A-Z]+|$)|[-_.\s]+([a-zA-Z]+))/g, '_$1')
  .replace(/[-.\s]/g, '')
  .toLowerCase()

/** @param {Object} object */
export const snakeCaseKeys = object => transformKeys(object, snakeCase)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveSnakeCaseKeys = object => {
  if (objectWithInvalidKeys(object)) return object

  if (Array.isArray(object)) {
    return object.map(value => recursiveSnakeCaseKeys(value))
  }

  return Object.keys(object).reduce((acc, key) => {
    acc[snakeCase(key)] = recursiveSnakeCaseKeys(object[key])

    return acc
  }, {})
}
