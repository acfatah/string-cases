import { assertString } from './utils/assert-string'
import { transformKeys } from './utils/transform-keys'
import { recursiveTransformKeys } from './utils/recursive-transform-keys'

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
export const recursiveSnakeCaseKeys = recursiveTransformKeys(snakeCase)
