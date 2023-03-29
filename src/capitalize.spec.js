import { describe, it, expect } from 'vitest'
import { capitalize } from './capitalize.js'

describe('capitalize', () => {
  it('should return empty string on null', () => {
    const expected = ''
    const string = null

    expect(capitalize(string)).toBe(expected)
  })

  it('shold capitalize string', () => {
    const expected = 'Lorem Ipsum Dolor Sit Amet'
    const string = 'lorem ipsum dolor sit amet'

    expect(capitalize(string)).toBe(expected)
  })
})

describe('invalid strings', () => {
  const notAStringValues = [
    { type: 'undefined', value: undefined },
    { type: 'number', value: 123 },
    { type: 'symbol', value: Symbol() },
    { type: 'array', value: [] },
    { type: 'set', value: new Set },
    { type: 'boolean', value: true },
    { type: 'object', value: {} },
    { type: 'function', value: () => {} },
  ]

  notAStringValues.forEach(({ type, value }) => {
    it(`"${type}" should throw exceptions`, () => {
      expect(() => capitalize(value)).toThrow(TypeError)
      expect(() => capitalize(value)).toThrow('Expected argument to be of type string')
    })
  })
})
