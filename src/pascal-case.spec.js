import { describe, it, expect } from 'vitest'
import { pascalCase } from './pascal-case.js'

describe('pascalCase', () => {
  it('should return empty string on null', () => {
    const expected = ''
    const string = null

    expect(pascalCase(string)).toBe(expected)
  })

  it('should convert database table name like "admin_users" to "AdminUsers"', () => {
    const expected = 'AdminUsers'
    const string = 'admin_users'

    expect(pascalCase(string)).toBe(expected)
  })

  it('should convert title like "admin user" to "AdminUser"', () => {
    const expected = 'AdminUser'
    const string = 'admin user'

    expect(pascalCase(string)).toBe(expected)
  })

  it('should convert title like "Admin User" to "AdminUser"', () => {
    const expected = 'AdminUser'
    const string = 'Admin User'

    expect(pascalCase(string)).toBe(expected)
  })

  it('should convert slug like "admin-user" to "AdminUser"', () => {
    const expected = 'AdminUser'
    const string = 'admin-user'

    expect(pascalCase(string)).toBe(expected)
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
      expect(() => pascalCase(value)).toThrow(TypeError)
      expect(() => pascalCase(value)).toThrow('Expected argument to be of type string')
    })
  })
})
