import { describe, it, expect } from 'vitest'
import { kebabCase, kebabCaseKeys, recursiveKebabCaseKeys } from './kebab-case.js'

describe('kebabCase', () => {
  const expectedValue = 'first-name'
  const testCases = [
    { expectedValue: '', actualValue: null },
    { expectedValue, actualValue: 'first-name' },
    { expectedValue, actualValue: 'first_name' },
    { expectedValue, actualValue: 'firstName' },
    { expectedValue, actualValue: 'first name' },
    { expectedValue, actualValue: 'First Name' }
  ]

  testCases.forEach(({ expectedValue, actualValue }) => {
    it(`should convert "${actualValue}" to "${expectedValue}"`, () => {
      expect(kebabCase(actualValue)).toBe(expectedValue)
    })
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
      expect(() => kebabCase(value)).toThrow(TypeError)
      expect(() => kebabCase(value)).toThrow('Expected argument to be of type string')
    })
  })
})

describe('kebabCaseKeys', () => {
  it('should convert object keys to kebab-case', () => {
    const aSymbol = Symbol('a symbol as an object key')
    const expected = {
      'full-name': 'Foo Bar',
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

    expect(kebabCaseKeys(object)).toMatchObject(expected)
  })
})

describe('recursiveKebabCaseKeys', () => {
  it('should convert object keys to kebabCase recursively', () => {
    const expected = {
      'full-name': { 'first-name': 'Foo', 'last-name': 'Bar' },

      aliases: [
        { 'first-name': 'Xoo', 'last-name': 'Xar' },
        { 'first-name': 'Yoo', 'last-name': 'Yar' }
      ]
    }

    const object = {
      full_name: { first_name: 'Foo', last_name: 'Bar' },

      aliases: [
        { first_name: 'Xoo', last_name: 'Xar' },
        { first_name: 'Yoo', last_name: 'Yar' }
      ]
    }

    expect(recursiveKebabCaseKeys(object)).toMatchObject(expected)
  })

  it('should convert object keys from an array to kebabCase recursively', () => {
    const expected = [
      { 'first-name': 'Xoo', 'last-name': 'Xar' },
      { 'first-name': 'Yoo', 'last-name': 'Yar' }
    ]

    const object = [
      { first_name: 'Xoo', last_name: 'Xar' },
      { first_name: 'Yoo', last_name: 'Yar' }
    ]

    expect(recursiveKebabCaseKeys(object)).toMatchObject(expected)
  })
})
