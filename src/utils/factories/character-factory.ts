import { faker } from '@faker-js/faker'
import { Character } from '../../domain/entities/character'

export const createCharacter = (data: Partial<Character> = {}): Character => {
  return new Character({
    characterId: faker.string.uuid(),
    health: faker.number.int(),
    movimentation: faker.number.int(),
    strength: faker.number.int(),
    ...data,
  })
}
