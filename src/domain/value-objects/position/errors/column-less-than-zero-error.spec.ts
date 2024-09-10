import { InvalidValueError } from '../../../errors/invalid-value-error'
import { columnLessThanZeroError } from './column-less-than-zero-error'

const sut = columnLessThanZeroError

describe('columnLessThanZeroError unit test', () => {
  it('ensure returned error has correct property values', () => {
    const value = 5

    const error = sut(value)

    expect(error).toBeInstanceOf(InvalidValueError)
    expect(error.name).toBe('InvalidValueError')
    expect(error.key).toBe('POSITION.COLUMN_LESS_THAN_ZERO')
    expect(error.message).toBe('Invalid column value for position')
    expect(error.details?.value).toBe(value)
  })
})
