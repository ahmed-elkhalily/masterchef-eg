import { test, expect, describe, vi } from 'vitest'

import alerts from './alert.js'

const alert = alerts()

describe('test accessToken connectors', () => {
  global.localStorage = {
    data: {},
    getItem (key) {
      return this.data[key]
    },
    setItem (key, value) {
      this.data[key] = value
    },
    removeItem (key) {
      delete this.data[key]
    }
  }

  test('test success confirmAlert', async () => {
    const Swal = await import('sweetalert2')
    Swal.default.fire = vi.fn().mockResolvedValue(true)
    const res = await alert.confirmAlert()
    expect(res).toEqual(true)
  })

  test('test success message', async () => {
    const Swal = await import('sweetalert2')
    Swal.default.fire = vi.fn().mockResolvedValue(true)
    const res = await alert.message()
    expect(res).toEqual(true)
  })
})
