import { faker } from '@faker-js/faker'
import {
  Position,
  PositionProps,
} from '../../core/domain/value-objects/position'

export const createPosition = (data: Partial<PositionProps> = {}): Position => {
  return new Position({
    row: faker.number.int(),
    column: faker.number.int(),
    ...data,
  })
}
