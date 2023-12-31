import { describe, it, expect } from 'vitest'
import { camelCase, camelCaseKeys, recursiveCamelCaseKeys } from './camel-case.js'

describe('camelCase', () => {
  it('should return empty string on null', () => {
    const expected = ''
    const string = null

    expect(camelCase(string)).toBe(expected)
  })

  it('should convert database attribute like "first_name" to "firstName"', () => {
    const expected = 'firstName'
    const string = 'first_name'

    expect(camelCase(string)).toBe(expected)
  })

  it('should convert title like "first name" to "firstName"', () => {
    const expected = 'firstName'
    const string = 'first name'

    expect(camelCase(string)).toBe(expected)
  })

  it('should convert title like "First Name" to "firstName"', () => {
    const expected = 'firstName'
    const string = 'First Name'

    expect(camelCase(string)).toBe(expected)
  })

  it('should convert slug like "first-name" to "firstName"', () => {
    const expected = 'firstName'
    const string = 'first-name'

    expect(camelCase(string)).toBe(expected)
  })
})

describe('invalid strings', () => {
  const notAStringValues = [
    { type: 'undefined', value: undefined },
    { type: 'number', value: 123 },
    { type: 'symbol', value: Symbol('a symbol as an object key') },
    { type: 'array', value: [] },
    { type: 'set', value: new Set() },
    { type: 'boolean', value: true },
    { type: 'object', value: {} },
    { type: 'function', value: () => {} }
  ]

  notAStringValues.forEach(({ type, value }) => {
    it(`"${type}" should throw exceptions`, () => {
      expect(() => camelCase(value)).toThrow(TypeError)
      expect(() => camelCase(value)).toThrow('Expected argument to be of type string')
    })
  })
})

describe('camelCaseKeys', () => {
  it('should convert object keys to camelCase', () => {
    const aSymbol = Symbol('a symbol as an object key')
    const expected = {
      fullName: 'Foo Bar',
      123: '123',
      '456': '456', // eslint-disable-line quote-props
      [aSymbol]: 'a symbol'
    }

    const object = {
      full_name: 'Foo Bar',
      123: '123',
      '456': '456', // eslint-disable-line quote-props
      [aSymbol]: 'a symbol'
    }

    expect(camelCaseKeys(object)).toMatchObject(expected)
  })
})

describe('recursiveCamelCaseKeys', () => {
  it('should convert object keys to camelCase recursively', () => {
    const expected = {
      fullName: { firstName: 'Foo', lastName: 'Bar' },

      aliases: [
        { firstName: 'Xoo', lastName: 'Xar' },
        { firstName: 'Yoo', lastName: 'Yar' }
      ]
    }

    const object = {
      full_name: { first_name: 'Foo', last_name: 'Bar' },

      aliases: [
        { first_name: 'Xoo', last_name: 'Xar' },
        { first_name: 'Yoo', last_name: 'Yar' }
      ]
    }

    expect(recursiveCamelCaseKeys(object)).toMatchObject(expected)
  })

  it('should convert object keys from an array to camelCase recursively', () => {
    const expected = [
      { firstName: 'Xoo', lastName: 'Xar' },
      { firstName: 'Yoo', lastName: 'Yar' }
    ]

    const object = [
      { first_name: 'Xoo', last_name: 'Xar' },
      { first_name: 'Yoo', last_name: 'Yar' }
    ]

    expect(recursiveCamelCaseKeys(object)).toMatchObject(expected)
  })
})
