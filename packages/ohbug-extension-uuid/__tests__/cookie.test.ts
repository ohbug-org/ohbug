import { beforeEach, describe, expect, test } from 'vitest'
import { docCookies } from '../src/cookie'

describe('@ohbug/extension-uuid/cookie', () => {
  const key = 'cookie_key'
  const value = 'cookie_value'
  const target = `${key}=${value}`

  beforeEach(() => {
    docCookies.removeItem(key)
  })

  test('setItem: should work', () => {
    docCookies.setItem(key, value)
    expect(document.cookie).toBe(target)
  })

  test('setItem: should return false when no key is passed in', () => {
    const result = docCookies.setItem('', value)
    expect(result).toBe(false)
  })

  test('setItem: should add max-age when sEnd is passed as number', () => {
    const result = docCookies.setItem(key, value, 1)
    expect(result).toBe(`${target}; max-age=1`)
  })

  test('setItem: should add expires when sEnd is passed as Infinity', () => {
    const result = docCookies.setItem(key, value, Infinity)
    expect(result).toBe(`${target}; expires=Fri, 31 Dec 9999 23:59:59 GMT`)
  })

  test('setItem: should add expires when sEnd is passed as string', () => {
    const result = docCookies.setItem(key, value, '1')
    expect(result).toBe(`${target}; expires=1`)
  })

  test('setItem: should add expires when sEnd is passed as Date', () => {
    const date = new Date()
    const result = docCookies.setItem(key, value, date)
    expect(result).toBe(`${target}; expires=${date.toUTCString()}`)
  })

  test('setItem: should add path when sPath is passed as string', () => {
    const result = docCookies.setItem(key, value, 1, '/a')
    expect(result).toBe(`${target}; max-age=1; path=/a`)
  })

  test('setItem: should add domain when sDomain is passed as string', () => {
    const result = docCookies.setItem(key, value, 1, '/a', 'b.com')
    expect(result).toBe(`${target}; max-age=1; domain=b.com; path=/a`)
  })

  test('setItem: should add secure when bSecure is passed', () => {
    const result = docCookies.setItem(key, value, 1, '/a', 'b.com', true)
    expect(result).toBe(`${target}; max-age=1; domain=b.com; path=/a; secure`)
  })

  test('getItem: should work', () => {
    docCookies.setItem(key, value)
    const cookie = docCookies.getItem(key)
    expect(cookie).toBe(value)
  })

  test('removeItem: should work', () => {
    docCookies.setItem(key, value)
    docCookies.removeItem(key)
    expect(document.cookie).toBe('')
  })

  test('removeItem: should return false when no key is passed in', () => {
    const result = docCookies.removeItem('')
    expect(result).toBe(false)
  })
})
