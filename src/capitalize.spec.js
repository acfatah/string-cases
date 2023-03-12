import { describe, it, expect } from 'vitest'
import { capitalize } from './capitalize.js'

describe('capitalizze', () => {
  it('shold capitalize string', () => {
    const expected = 'Lorem Ipsum Dolor Sit Amet'
    const string = 'lorem ipsum dolor sit amet'

    expect(capitalize(string)).toBe(expected)
  })
})
