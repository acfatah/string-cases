/** * @param {any} value */
export const assertString = value => {
  if (value === null) return ''

  if (typeof value !== 'string') {
    throw new TypeError('Expected argument to be of type string')
  }

  return value
}
