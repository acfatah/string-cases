/* eslint-disable no-multi-spaces */

import { assertString } from './utils/assert-string'
import { transformKeys } from './utils/transform-keys'
import { recursiveTransformKeys } from './utils/recursive-transform-keys'

export const constantCase = string => assertString(string)
  .trim()
  .replace(/\B([A-Z])/g, '_$1') // Replace uppercase letters with added _
  .replace(/\s+/g, '_')         // Replace spaces with _
  .replace(/[^\w-]+/g, '')      // Remove all non-word chars
  .replace(/-/g, '_')           // Replace - with _
  .replace(/__+/g, '_')         // Replace multiple _ with single _
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
