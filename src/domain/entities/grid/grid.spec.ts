import { Grid } from '.'
import { Size } from '../../value-objects/size'

describe('Grid testes', () => {
  describe('create unit test', () => {
    it('Return instance', () => {
      // Assert
      const grid = Grid.create(Size.create(1, 2))

      // Assert
      expect(grid).toBeInstanceOf(Grid)
    })
  })

  describe('recover unit test', () => {
    it('Should recover grid instance', () => {
      // Assert
      const grid = Grid.create(Size.create(1, 2))

      // Assert
      expect(grid).toBeInstanceOf(Grid)
    })
  })
})
