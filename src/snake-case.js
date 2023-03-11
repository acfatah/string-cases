export const snakeCase = string => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected argument to be of type string')
  }

  return string
    .replace(/(?!^)([A-Z]+(?![A-Z]+|$)|[-_.\s]+([a-zA-Z]+))/g, '_$1')
    .replace(/[-.\s]/g, '')
    .toLowerCase()
}
