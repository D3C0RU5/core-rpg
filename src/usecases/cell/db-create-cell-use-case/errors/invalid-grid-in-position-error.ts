import { InvalidValueError } from '../../../../domain/errors/invalid-value-error'
import { Position } from '../../../../domain/value-objects/position'

export const invalidGridInPositionError = (position: Position) => {
  return new InvalidValueError(
    'CELL.INVALID-POSITION',
    'Is not possible create a cell in this position',
    { position: position.toSnapshot() },
  )
}
