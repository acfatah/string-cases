import { objectWithInvalidKeys } from './object-with-invalid-keys'

export const recursiveTransformKeys = (transformFunc) => (object) => {
  if (objectWithInvalidKeys(object)) return object

  if (Array.isArray(object)) {
    return object.map(value => recursiveTransformKeys(transformFunc)(value))
  }

  return Object.keys(object).reduce((acc, key) => {
    acc[transformFunc(key)] = recursiveTransformKeys(transformFunc)(object[key])
    return acc
  }, {})
}
