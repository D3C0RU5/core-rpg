import { faker } from '@faker-js/faker'
import { Grid, GridProps } from '../../core/domain/entities/grid'
import { createSize } from './size-factory'

export const createGrid = (data: Partial<GridProps> = {}): Grid => {
  return new Grid({
    gridId: faker.string.uuid(),
    size: createSize(),
    ...data,
  })
}
