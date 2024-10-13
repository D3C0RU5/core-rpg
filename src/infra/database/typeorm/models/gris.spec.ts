import { faker } from '@faker-js/faker/.'
import { GridModel } from './grid'
import { Grid } from '../../../../core/domain/entities/grid'

describe('GridModel', () => {
  describe('mapToEntity', () => {
    it('generate Grid correctly', () => {
      // Assert
      const model = new GridModel()
      model.gridId = faker.string.uuid()
      model.rows = faker.number.int()
      model.columns = faker.number.int()

      // Act
      const entity = model.mapToEntity()

      // Assert
      expect(entity).toBeInstanceOf(Grid)
    })
  })
})
