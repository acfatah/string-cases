import { assertString } from './utils/assert-string'

/** @param {string} string */
export const pascalCase = string => assertString(string)
  .toLowerCase()
  .replace(/([-_.\s][a-z0-9])/g, char => char[1].toUpperCase())
  .replace(/\b[a-z]/g, char => char.toUpperCase())

