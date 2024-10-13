import { faker } from '@faker-js/faker'
import { CellModel } from './cell'
import { Cell } from '../../../../core/domain/entities/cell'

describe('CellModel', () => {
  describe('mapToEntity', () => {
    it('generate Cell correctly', () => {
      // Assert
      const model = new CellModel()
      model.cellId = faker.string.uuid()
      model.gridId = faker.string.uuid()
      model.row = faker.number.int()
      model.column = faker.number.int()
      model.walkable = faker.datatype.boolean()

      // Act
      const entity = model.mapToEntity()

      // Assert
      expect(entity).toBeInstanceOf(Cell)
    })
  })
})
