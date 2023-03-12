export const pascalCase = string => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected argument to be of type string')
  }

  return string
    .toLowerCase()
    .replace(/([-_.\s][a-z0-9])/g, char => char[1].toUpperCase())
    .replace(/\b[a-z]/g, char => char.toUpperCase())
}
