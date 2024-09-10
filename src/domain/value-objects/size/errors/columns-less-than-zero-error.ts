import { InvalidValueError } from '../../../errors/invalid-value-error'

export const columnsLessThanZeroError = (columnsValue: number) => {
  return new InvalidValueError(
    'SIZE.COLUMNS_LESS_THAN_ZERO',
    'Invalid columns value for size',
    columnsValue,
  )
}
