import { objectWithInvalidKeys } from './object-with-invalid-keys'

const transformArrayKeys = (transformFunc, array) => {
  return array.map(value => recursiveTransformKeys(transformFunc)(value))
}

export const recursiveTransformKeys = (transformFunc) => (object) => {
  if (objectWithInvalidKeys(object)) return object

  if (Array.isArray(object)) {
    return transformArrayKeys(transformFunc, object)
  }

  return Object.keys(object).reduce((acc, key) => {
    acc[transformFunc(key)] = recursiveTransformKeys(transformFunc)(object[key])
    return acc
  }, {})
}
