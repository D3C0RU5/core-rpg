import { Cell } from '.'

describe('Cell testes', () => {
  describe('create unit test', () => {
    it('Should create cell instance', () => {
      // Assert
      const cell = Cell.create()

      // Assert
      expect(cell).toBeInstanceOf(Cell)
    })
  })

  describe('recover unit test', () => {
    it('Should recover cell instance', () => {
      // Assert
      const cell = new Cell(true, [])

      // Assert
      expect(cell).toBeInstanceOf(Cell)
    })
  })

  describe('isCellWalkable unit test', () => {
    it('Return false when walkable is false', () => {
      // Assert
      const cell = new Cell(false, [])

      // Assert
      expect(cell.isCellWalkable()).toBe(false)
    })

    it('Return true when walkable is true', () => {
      // Assert
      const cell = new Cell(false, [])

      // Assert
      expect(cell.isCellWalkable()).toBe(false)
    })
  })
})
