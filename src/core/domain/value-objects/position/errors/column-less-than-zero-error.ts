import { InvalidValueError } from '../../../../../utils/errors/invalid-value-error'

export const columnLessThanZeroError = (columnValue: number) => {
  return new InvalidValueError(
    'POSITION.COLUMN_LESS_THAN_ZERO',
    'Invalid column value for position',
    columnValue,
  )
}
