import { InvalidValueError } from '../../../errors/InvalidValueError'

export const rowLessThanZeroError = (rowValue: number) => {
  return new InvalidValueError(
    'POSITION.ROW_LESS_THAN_ZERO',
    'Invalid row value for position',
    rowValue,
  )
}
