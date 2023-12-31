/* eslint-disable no-multi-spaces */

import { assertString } from './assert-string'

/** @param {string|null} string */
export const combineWords = (string, char) => assertString(string)
  .trim()
  .replace(/\B([A-Z])/g, `${char}$1`) // Replace uppercase letters with added char
  .replace(/\s+/g, char)              // Replace spaces with char
  .replace(/[^\w-]+/g, '')            // Remove all non-word chars
