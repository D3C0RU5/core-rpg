import { InvalidValueError } from '../../../errors/InvalidValueError'
import { rowLessThanZeroError } from './row-less-than-zero-error'

const sut = rowLessThanZeroError

describe('rowLessThanZeroError unit test', () => {
  it('ensure returned error has correct property values', () => {
    const value = 5

    const error = sut(value)

    expect(error).toBeInstanceOf(InvalidValueError)
    expect(error.name).toBe('InvalidValueError')
    expect(error.key).toBe('POSITION.ROW_LESS_THAN_ZERO')
    expect(error.message).toBe('Invalid row value for position')
    expect(error.details?.value).toBe(value)
  })
})
