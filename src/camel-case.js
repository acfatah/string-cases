import { assertString } from './utils/assert-string'
import { objectWithInvalidKeys } from './utils/object-with-invalid-keys'
import { transformKeys } from './utils/transform-keys'

/** @param {string|null} string */
export const camelCase = string => assertString(string)
  .toLowerCase()
  .replace(/([-_.\s][a-z0-9])/g, char => char[1].toUpperCase())

/** @param {Object} object */
export const camelCaseKeys = object => transformKeys(object, camelCase)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveCamelCaseKeys = object => {
  if (objectWithInvalidKeys(object)) return object

  if (Array.isArray(object)) {
    return object.map(value => recursiveCamelCaseKeys(value))
  }

  return Object.keys(object).reduce((acc, key) => {
    acc[camelCase(key)] = recursiveCamelCaseKeys(object[key])

    return acc
  }, {})
}
