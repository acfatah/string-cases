import { describe, it, expect } from 'vitest'
import { snakeCase, snakeCaseKeys, recursiveSnakeCaseKeys } from './snake-case.js'

describe('snakeCase', () => {
  it('should return empty string on null', () => {
    const expected = ''
    const string = null

    expect(snakeCase(string)).toBe(expected)
  })

  it('should convert object key like "firstName" to "first_name"', () => {
    const expected = 'first_name'
    const string = 'firstName'

    expect(snakeCase(string)).toBe(expected)
  })

  it('should convert title like "first name" to "first_name"', () => {
    const expected = 'first_name'
    const string = 'first name'

    expect(snakeCase(string)).toBe(expected)
  })

  it('should convert capitalized title like "First Name" to "first_name"', () => {
    const expected = 'first_name'
    const string = 'First Name'

    expect(snakeCase(string)).toBe(expected)
  })

  it('should convert url parameter / slug like "first-name" to "first_name"', () => {
    const expected = 'first_name'
    const string = 'first-name'

    expect(snakeCase(string)).toBe(expected)
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
    { type: 'function', value: () => { } }
  ]

  notAStringValues.forEach(({ type, value }) => {
    it(`"${type}" should throw exceptions`, () => {
      expect(() => snakeCase(value)).toThrow(TypeError)
      expect(() => snakeCase(value)).toThrow('Expected argument to be of type string')
    })
  })
})

describe('snakeCaseKeys', () => {
  it('should convert object keys to snakeCase', () => {
    const aSymbol = Symbol('a symbol as an object key')
    const expected = {
      full_name: 'Foo Bar',
      123: '123',
      '456': '456', // eslint-disable-line quote-props
      [aSymbol]: 'a symbol'
    }

    const object = {
      fullName: 'Foo Bar',
      123: '123',
      '456': '456', // eslint-disable-line quote-props
      [aSymbol]: 'a symbol'
    }

    expect(snakeCaseKeys(object)).toMatchObject(expected)
  })
})

describe('recursiveSnakeCaseKeys', () => {
  it('should convert object keys to snakeCase recursively', () => {
    const expected = {
      full_name: { first_name: 'Foo', last_name: 'Bar' },

      aliases: [
        { first_name: 'Xoo', last_name: 'Xar' },
        { first_name: 'Yoo', last_name: 'Yar' }
      ]
    }

    const object = {
      fullName: { firstName: 'Foo', lastName: 'Bar' },

      aliases: [
        { firstName: 'Xoo', lastName: 'Xar' },
        { firstName: 'Yoo', lastName: 'Yar' }
      ]
    }

    expect(recursiveSnakeCaseKeys(object)).toMatchObject(expected)
  })

  it('should convert object keys from an array to snakeCase recursively', () => {
    const expected = [
      { first_name: 'Xoo', last_name: 'Xar' },
      { first_name: 'Yoo', last_name: 'Yar' }
    ]

    const object = [
      { firstName: 'Xoo', lastName: 'Xar' },
      { firstName: 'Yoo', lastName: 'Yar' }
    ]

    expect(recursiveSnakeCaseKeys(object)).toMatchObject(expected)
  })
})
