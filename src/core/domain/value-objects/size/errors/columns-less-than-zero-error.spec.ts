import { InvalidValueError } from '../../../../../utils/errors/invalid-value-error'
import { columnsLessThanZeroError } from './columns-less-than-zero-error'

const sut = columnsLessThanZeroError

describe('columnsLessThanZeroError unit test', () => {
  it('ensure returned error has correct property values', () => {
    const value = 5

    const error = sut(value)

    expect(error).toBeInstanceOf(InvalidValueError)
    expect(error.name).toBe('InvalidValueError')
    expect(error.key).toBe('SIZE.COLUMNS_LESS_THAN_ZERO')
    expect(error.message).toBe('Invalid columns value for size')
    expect(error.details?.value).toBe(value)
  })
})
