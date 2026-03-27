import { describe, expect, it } from 'vitest'

import { getLabelFromPrice } from './getLabelFromPrice'

describe('getLabelFromPrice', () => {
  it('returns "Not specified" when price is undefined', () => {
    expect(getLabelFromPrice(undefined, 'USD')).toBe('Not specified')
  })

  it('returns "Not specified" when currency is missing', () => {
    expect(getLabelFromPrice(10, undefined)).toBe('Not specified')
  })

  it('returns "Free" when price is 0 and currency is present', () => {
    expect(getLabelFromPrice(0, 'CZK')).toBe('Free')
  })

  it('formats a non-zero price with two decimals', () => {
    expect(getLabelFromPrice(12.5, 'EUR')).toBe('12.50 EUR')
    expect(getLabelFromPrice(12, 'EUR')).toBe('12.00 EUR')
  })
})
