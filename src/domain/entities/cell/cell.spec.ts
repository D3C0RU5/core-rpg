import { Cell } from '.'
import { Position } from '../../value-objects/position'

describe('Cell testes', () => {
  describe('create unit test', () => {
    it('Should create cell instance', () => {
      // Assert
      const cell = Cell.create(Position.create(1, 2), true)

      // Assert
      expect(cell).toBeInstanceOf(Cell)
    })
  })

  describe('recover unit test', () => {
    it('Should recover cell instance', () => {
      // Assert
      const cell = new Cell('any_id', Position.create(1, 2), true)

      // Assert
      expect(cell).toBeInstanceOf(Cell)
    })
  })

  describe('isWalkable unit test', () => {
    it('Return false when walkable is false', () => {
      // Assert
      const cell = Cell.create(Position.create(1, 2), false)

      // Assert
      expect(cell.isWalkable()).toBe(false)
    })

    it('Return true when walkable is true', () => {
      // Assert
      const cell = Cell.create(Position.create(1, 2), true)

      // Assert
      expect(cell.isWalkable()).toBe(true)
    })
  })
})
