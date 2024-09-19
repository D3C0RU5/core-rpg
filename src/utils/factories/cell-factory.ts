import { faker } from '@faker-js/faker'
import { createPosition } from './position-factory'
import { createCharacter } from './character-factory'
import { Cell, CellProps } from '../../core/domain/entities/cell'

export const createCell = (data: Partial<CellProps> = {}): Cell => {
  return new Cell({
    cellId: faker.string.uuid(),
    gridId: faker.string.uuid(),
    position: createPosition(),
    walkable: faker.datatype.boolean(),
    character: createCharacter(),
    ...data,
  })
}
