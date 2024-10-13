import { faker } from '@faker-js/faker/.'
import { Character } from '../../../../core/domain/entities/character'
import { CharacterModel } from './character'

describe('CharacterModel', () => {
  describe('mapToEntity', () => {
    it('generate Character correctly', () => {
      // Assert
      const model = new CharacterModel()
      model.characterId = faker.string.uuid()
      model.health = faker.number.int()
      model.movimentation = faker.number.int()
      model.strength = faker.number.int()

      // Act
      const entity = model.mapToEntity()

      // Assert
      expect(entity).toBeInstanceOf(Character)
    })
  })
})
