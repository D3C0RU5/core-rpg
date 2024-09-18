import { Cell } from '../../domain/entities/cell'
import { faker } from '@faker-js/faker'
import { createPosition } from './position-factory'
import { createCharacter } from './character-factory'

export const createCell = (data: Partial<Cell> = {}): Cell => {
  return new Cell({
    cellId: faker.string.uuid(),
    gridId: faker.string.uuid(),
    position: createPosition(),
    walkable: faker.datatype.boolean(),
    character: createCharacter(),
    ...data,
  })
}
