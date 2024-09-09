import { InvalidValueError } from '../../../errors/InvalidValueError'

export const columnsLessThanZeroError = (columnsValue: number) => {
  return new InvalidValueError(
    'SIZE.COLUMNS_LESS_THAN_ZERO',
    'Invalid columns value for size',
    columnsValue,
  )
}
