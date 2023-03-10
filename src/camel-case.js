export const camelCase = string => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected argument to be of type string')
  }

  return string
    .toLowerCase()
    .replace(/([-_.\s][a-z0-9])/g, char => char[1].toUpperCase())
}

export const camelCaseKeys = object => Object.keys(object).reduce(
  (result, key) => Object.assign(result, { [camelCase(key)]: object[key] }), {}
)

export const recursiveCamelCaseKeys = object => {
  if (
    object == null
    || typeof object !== 'object'
    || object instanceof Date
    || object instanceof RegExp
  ) return object

  if (Array.isArray(object)) {
    return object.map(value => recursiveCamelCaseKeys(value))
  }

  return Object.keys(object).reduce((acc, key) => {
    acc[camelCase(key)] = recursiveCamelCaseKeys(object[key])

    return acc
  }, {})
}
