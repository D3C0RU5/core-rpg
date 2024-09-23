import { Grid } from '.'
import { Size } from '../../value-objects/size'

describe('Grid testes', () => {
  describe('contructor unit test', () => {
    it('Return instance', () => {
      // Arrange
      const uuid = crypto.randomUUID()
      const size = Size.create(1, 2)

      // Assert
      const grid = new Grid(uuid, size)

      // Assert
      expect(grid).toBeInstanceOf(Grid)
      expect(grid['gridId']).toBe(uuid)
      expect(grid['size'].toSnapshot()).toEqual(size.toSnapshot())
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
      const uuid = crypto.randomUUID()
      const size = Size.create(1, 2)

      // Assert
      const grid = new Grid(uuid, size)

      // Assert
      expect(grid.Id).toBe(uuid)
    })
  })

  describe('Size unit test', () => {
    it('Should return size value', () => {
      // Arrange
      const uuid = crypto.randomUUID()
      const size = Size.create(1, 2)

      // Assert
      const grid = new Grid(uuid, size)

      // Assert
      expect(grid.Size).toBe(size)
    })
  })

  describe('toSnapshot unit test', () => {
    it('Should recover grid instance', () => {
      // Arrange
      const uuid = crypto.randomUUID()
      const size = Size.create(1, 2)

      // Assert
      const grid = new Grid(uuid, size)

      // Assert
      expect(grid.toSnapshot()).toEqual({
        gridId: uuid,
        size: size.toSnapshot(),
      })
    })
  })
})
