import { combineWords } from './utils/combine-words'
import { transformKeys } from './utils/transform-keys'
import { recursiveTransformKeys } from './utils/recursive-transform-keys'

/** @param {string|null} string */
export const constantCase = string => combineWords(string, '_')
  .toUpperCase()

/** @param {Object} object */
export const constantCaseKeys = object => transformKeys(object, constantCase)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveConstantCaseKeys = recursiveTransformKeys(constantCase)
