import { describe, it, expect } from 'vitest'
import { snakeCase, snakeCaseKeys, recursivesnakeCaseKeys } from './snake-case.js'

describe('snakeCase', () => {
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
    { type: 'null', value: null },
    { type: 'number', value: 123 },
    { type: 'symbol', value: Symbol() },
    { type: 'array', value: [] },
    { type: 'set', value: new Set },
    { type: 'boolean', value: true },
    { type: 'object', value: {} },
    { type: 'function', value: () => { } },
  ]

  notAStringValues.forEach(({ type, value }) => {
    it(`"${type}" should throw exceptions`, () => {
      expect(() => snakeCase(value)).toThrow(TypeError)
      expect(() => snakeCase(value)).toThrow('Expected argument to be of type string')
    })
  })
})

describe('snakeCaseKeys', () => {
  it.todo('should convert object keys to snakeCase', () => {
    const aSymbol = Symbol()
    const expected = {
      'full_name': 'Foo Bar',
      123: '123',
      '456': '456',
      [aSymbol]: 'a symbol'
    }

    const object = {
      'fullName': 'Foo Bar',
      123: '123',
      '456': '456',
      [aSymbol]: 'a symbol'
    }

    expect(snakeCaseKeys(object)).toMatchObject(expected)
  })
})

describe('recursivesnakeCaseKeys', () => {
  it.todo('should convert object keys to snakeCase recursively', () => {
    const expected = {
      full_name: { first_name: 'Foo', last_name: 'Bar' },

      aliases: [
        { first_name: 'Xoo', last_name: 'Xar' },
        { first_name: 'Yoo', last_name: 'Yar' },
      ]
    }

    const object = {
      fullName: { firstName: 'Foo', lastName: 'Bar' },

      aliases: [
        { firstName: 'Xoo', lastName: 'Xar' },
        { firstName: 'Yoo', lastName: 'Yar' },
      ]
    }

    expect(recursivesnakeCaseKeys(object)).toMatchObject(expected)
  })

  it.todo('should convert object keys from an array to snakeCase recursively', () => {
    const expected = [
      { first_name: 'Xoo', last_name: 'Xar' },
      { first_name: 'Yoo', last_name: 'Yar' },
    ]

    const object = [
      { firstName: 'Xoo', lastName: 'Xar' },
      { firstName: 'Yoo', lastName: 'Yar' },
    ]

    expect(recursivesnakeCaseKeys(object)).toMatchObject(expected)
  })
})
