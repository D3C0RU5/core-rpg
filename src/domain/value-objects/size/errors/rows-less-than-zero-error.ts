import { InvalidValueError } from '../../../errors/invalid-value-error'

export const rowsLessThanZeroError = (rowsValue: number) => {
  return new InvalidValueError(
    'SIZE.ROWS_LESS_THAN_ZERO',
    'Invalid rows value for size',
    rowsValue,
  )
}
