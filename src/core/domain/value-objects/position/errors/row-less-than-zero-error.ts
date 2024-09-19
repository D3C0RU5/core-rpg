import { InvalidValueError } from '../../../../../utils/errors/invalid-value-error'

export const rowLessThanZeroError = (rowValue: number) => {
  return new InvalidValueError(
    'POSITION.ROW_LESS_THAN_ZERO',
    'Invalid row value for position',
    rowValue,
  )
}
