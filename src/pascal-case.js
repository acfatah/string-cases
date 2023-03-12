export const pascalCase = string => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected argument to be of type string')
  }

  return string
    .toLowerCase()
    .replace(/([-_.\s][a-z0-9])/g, char => char[1].toUpperCase())
    .replace(/\b[a-z]/g, char => char.toUpperCase())
}

// export const pascalCaseKeys = object => Object.keys(object).reduce(
//   (result, key) => Object.assign(result, { [pascalCase(key)]: object[key] }), {}
// )

// export const recursivePascalCaseKeys = object => {
//   if (
//     object == null
//     || typeof object !== 'object'
//     || object instanceof Date
//     || object instanceof RegExp
//   ) return object

//   if (Array.isArray(object)) {
//     return object.map(value => recursivePascalCaseKeys(value))
//   }

//   return Object.keys(object).reduce((acc, key) => {
//     acc[pascalCase(key)] = recursivePascalCaseKeys(object[key])

//     return acc
//   }, {})
// }
