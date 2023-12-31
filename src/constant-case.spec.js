import { describe, it, expect } from 'vitest'
import { constantCase, constantCaseKeys, recursiveConstantCaseKeys } from './constant-case.js'

describe('constantCase', () => {
  const expectedValue = 'FIRST_NAME'
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
      expect(constantCase(actualValue)).toBe(expectedValue)
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
      expect(() => constantCase(value)).toThrow(TypeError)
      expect(() => constantCase(value)).toThrow('Expected argument to be of type string')
    })
  })
})

describe('constantCaseKeys', () => {
  it('should convert object keys to constant-case', () => {
    const aSymbol = Symbol('a symbol as an object key')
    const expected = {
      FULL_NAME: 'Foo Bar',
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

    expect(constantCaseKeys(object)).toMatchObject(expected)
  })
})

describe('recursiveConstantCaseKeys', () => {
  it('should convert object keys to constantCase recursively', () => {
    const expected = {
      FULL_NAME: { FIRST_NAME: 'Foo', LAST_NAME: 'Bar' },

      ALIASES: [
        { FIRST_NAME: 'Xoo', LAST_NAME: 'Xar' },
        { FIRST_NAME: 'Yoo', LAST_NAME: 'Yar' }
      ]
    }

    const object = {
      full_name: { first_name: 'Foo', last_name: 'Bar' },

      aliases: [
        { first_name: 'Xoo', last_name: 'Xar' },
        { first_name: 'Yoo', last_name: 'Yar' }
      ]
    }

    expect(recursiveConstantCaseKeys(object)).toMatchObject(expected)
  })

  it('should convert object keys from an array to constantCase recursively', () => {
    const expected = [
      { FIRST_NAME: 'Xoo', LAST_NAME: 'Xar' },
      { FIRST_NAME: 'Yoo', LAST_NAME: 'Yar' }
    ]

    const object = [
      { first_name: 'Xoo', last_name: 'Xar' },
      { first_name: 'Yoo', last_name: 'Yar' }
    ]

    expect(recursiveConstantCaseKeys(object)).toMatchObject(expected)
  })
})
