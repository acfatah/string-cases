import { assertString } from './utils/assert-string'

/** @param {string} string */
export const capitalize = string => assertString(string).replace(/\b[a-z]/g, char => char.toUpperCase())
