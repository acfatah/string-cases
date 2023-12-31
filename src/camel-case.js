import { assertString } from './utils/assert-string'
import { transformKeys } from './utils/transform-keys'
import { recursiveTransformKeys } from './utils/recursive-transform-keys'

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
export const recursiveCamelCaseKeys = recursiveTransformKeys(camelCase)
