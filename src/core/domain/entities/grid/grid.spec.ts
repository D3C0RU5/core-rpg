import { Grid } from '.'
import { Size } from '../../value-objects/size'

describe('Grid testes', () => {
  describe('contructor unit test', () => {
    it('Return instance', () => {
      // Arrange
      const gridId = crypto.randomUUID()
      const size = Size.create(1, 2)

      // Assert
      const grid = new Grid({ gridId, size })

      // Assert
      expect(grid).toBeInstanceOf(Grid)
      expect(grid['gridId']).toBe(gridId)
    })
  })

  describe('create unit test', () => {
    it('Return instance', () => {
      // Assert
      const grid = Grid.create(Size.create(1, 2))

      // Assert
      expect(grid).toBeInstanceOf(Grid)
    })
  })

  describe('Id unit test', () => {
    it('Should return uuid value', () => {
      // Arrange
      const gridId = crypto.randomUUID()
      const size = Size.create(1, 2)

      // Assert
      const grid = new Grid({ gridId, size })

      // Assert
      expect(grid.Id).toBe(gridId)
    })
  })

  describe('Size unit test', () => {
    it('Should return size value', () => {
      // Arrange
      const gridId = crypto.randomUUID()
      const size = Size.create(1, 2)

      // Assert
      const grid = new Grid({ gridId, size })

      // Assert
      expect(grid.Size).toBe(size)
    })
  })
})
