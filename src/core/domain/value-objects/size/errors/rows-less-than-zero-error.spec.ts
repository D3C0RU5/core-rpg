import { InvalidValueError } from '../../../../../utils/errors/invalid-value-error'
import { rowsLessThanZeroError } from './rows-less-than-zero-error'

const sut = rowsLessThanZeroError

describe('rowsLessThanZeroError unit test', () => {
  it('ensure returned error has correct property values', () => {
    const value = 5

    const error = sut(value)

    expect(error).toBeInstanceOf(InvalidValueError)
    expect(error.name).toBe('InvalidValueError')
    expect(error.key).toBe('SIZE.ROWS_LESS_THAN_ZERO')
    expect(error.message).toBe('Invalid rows value for size')
    expect(error.details?.value).toBe(value)
  })
})
