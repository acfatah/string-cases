import { assertString } from './utils/assert-string'
import { transformKeys } from './utils/transform-keys'
import { recursiveTransformKeys } from './utils/recursive-transform-keys'

/** @param {string|null} string */
export const kebabCase = string => assertString(string)
  .trim()
  .replace(/\B([A-Z])/g, '-$1') // Replace uppercase letters with -
  .replace(/\s+/g, '-')         // Replace spaces with -
  .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
  .replace(/\_/g, '-')          // Replace _ with -
  .replace(/\-\-+/g, '-')       // Replace multiple - with single -
  .replace(/\-$/g, '')          // Remove trailing -
  .toLowerCase()

/** @param {Object} object */
export const kebabCaseKeys = object => transformKeys(object, kebabCase)

/**
 * @typedef {Object} NestedObject
 * @property {NestedObject|any} [key]
 */

/** @param {NestedObject} object */
export const recursiveKebabCaseKeys = recursiveTransformKeys(kebabCase)
