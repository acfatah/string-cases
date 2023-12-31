import { combineWords } from './utils/combine-words'
import { transformKeys } from './utils/transform-keys'
import { recursiveTransformKeys } from './utils/recursive-transform-keys'

const SEPARATOR = '_'

/** @param {string|null} string */
export const constantCase = string => combineWords(string, SEPARATOR)
  .replace(/-/g, SEPARATOR)           // Replace - with _
  .replace(/__+/g, SEPARATOR)         // Replace multiple _ with single _
  .replace(/_$/g, '')           // Remove trailing _
  .toUpperCase()                // Convert to uppercase

/** @param {Object} object */
export const constantCaseKeys = object => transformKeys(object, constantCase)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveConstantCaseKeys = recursiveTransformKeys(constantCase)
