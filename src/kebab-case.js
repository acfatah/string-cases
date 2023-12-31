import { combineWords } from './utils/combine-words'
import { transformKeys } from './utils/transform-keys'
import { recursiveTransformKeys } from './utils/recursive-transform-keys'

/** @param {string|null} string */
export const kebabCase = string => combineWords(string, '-')
  .toLowerCase()

/** @param {Object} object */
export const kebabCaseKeys = object => transformKeys(object, kebabCase)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveKebabCaseKeys = recursiveTransformKeys(kebabCase)
