import { createPosition } from '../../../../../utils/factories/position-factory'
import { invalidGridInPositionError } from './invalid-grid-in-position-error'

describe('invalidGridInPositionError unit test', () => {
  it('should return error', () => {
    // Arrange
    const position = createPosition()

    // Act
    const error = invalidGridInPositionError(position)

    // Assert
    expect(error.toSnapshot()).toEqual({
      name: 'InvalidValueError',
      key: 'CELL.INVALID-POSITION',
      message: 'Is not possible create a cell in this position',
      details: {
        value: {
          position: {
            row: position.Row,
            column: position.Column,
          },
        },
      },
    })
  })
})
