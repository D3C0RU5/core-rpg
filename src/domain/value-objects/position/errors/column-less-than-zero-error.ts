import { InvalidValueError } from '../../../errors/InvalidValueError'

export const columnLessThanZeroError = (columnValue: number) => {
  return new InvalidValueError(
    'POSITION.COLUMN_LESS_THAN_ZERO',
    'Invalid column value for position',
    columnValue,
  )
}
