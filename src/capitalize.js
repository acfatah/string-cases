export const capitalize = string => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected argument to be of type string')
  }

  return string.replace(/\b[a-z]/g, char => char.toUpperCase())
}
