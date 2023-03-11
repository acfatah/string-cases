export const snakeCase = string => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected argument to be of type string')
  }

  return string
    .replace(/(?!^)([A-Z]+(?![A-Z]+|$)|[-_.\s]+([a-zA-Z]+))/g, '_$1')
    .replace(/[-.\s]/g, '')
    .toLowerCase()
}

export const snakeCaseKeys = object => Object.keys(object).reduce(
  (result, key) => Object.assign(result, { [snakeCase(key)]: object[key] }), {}
)

export const recursiveSnakeCaseKeys = object => {
  if (
    object == null
    || typeof object !== 'object'
    || object instanceof Date
    || object instanceof RegExp
  ) return object

  if (Array.isArray(object)) {
    return object.map(value => recursiveSnakeCaseKeys(value))
  }

  return Object.keys(object).reduce((acc, key) => {
    acc[snakeCase(key)] = recursiveSnakeCaseKeys(object[key])

    return acc
  }, {})
}
