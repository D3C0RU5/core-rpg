import { Grid } from '.'
import { CharacterFactory } from '../character'
import { Position } from '../vo/position'
import { CellNotExistsError } from './errors/cell-not-exists-error'

describe('Grid testes', () => {
  describe('create unit test', () => {
    it('Return instance', () => {
      // Assert
      const grid = Grid.create({ columns: 10, rows: 5 })

      // Assert
      expect(grid).toBeInstanceOf(Grid)
    })
  })

  describe('recover unit test', () => {
    it('Should recover grid instance', () => {
      // Assert
      const grid = new Grid([[]])

      // Assert
      expect(grid).toBeInstanceOf(Grid)
    })
  })

  describe('getSize unit test', () => {
    it('Should recover grid instance', () => {
      // Assert
      const grid = Grid.create({ columns: 10, rows: 5 })

      // Act
      const size = grid.getSize()

      // Assert
      expect(size).toEqual({ columns: 10, rows: 5 })
    })
  })

  describe('getCell unit test', () => {
    it('Return correct cell', () => {
      // Assert
      const grid = Grid.create({ columns: 10, rows: 5 })
      const row = 1
      const column = 10

      // Act
      const size = grid.getCell(Position.create(row, column))

      // Assert
      expect(size).toEqual({ walkable: true })
    })

    it('Throw if cell not exists', () => {
      // Assert
      const grid = Grid.create({ rows: 5, columns: 10 })
      const row = 10
      const column = 0

      // Assert
      expect(() => grid.getCell(Position.create(row, column))).toThrow(
        new CellNotExistsError(),
      )
    })
  })
})
