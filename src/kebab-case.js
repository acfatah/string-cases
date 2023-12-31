import { combineWords } from './utils/combine-words'
import { transformKeys } from './utils/transform-keys'
import { recursiveTransformKeys } from './utils/recursive-transform-keys'

const SEPARATOR = '-'

/** @param {string|null} string */
export const kebabCase = string => combineWords(string, SEPARATOR)
  .replace(/_/g, SEPARATOR)           // Replace _ with -
  .replace(/--+/g, SEPARATOR)         // Replace multiple - with single -
  .replace(/-$/g, '')           // Remove trailing -
  .toLowerCase()

/** @param {Object} object */
export const kebabCaseKeys = object => transformKeys(object, kebabCase)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveKebabCaseKeys = recursiveTransformKeys(kebabCase)
