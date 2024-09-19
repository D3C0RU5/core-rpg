import { faker } from '@faker-js/faker'
import { Character, CharacterProps } from '../../core/domain/entities/character'

export const createCharacter = (
  data: Partial<CharacterProps> = {},
): Character => {
  return new Character({
    characterId: faker.string.uuid(),
    health: faker.number.int(),
    movimentation: faker.number.int(),
    strength: faker.number.int(),
    ...data,
  })
}
