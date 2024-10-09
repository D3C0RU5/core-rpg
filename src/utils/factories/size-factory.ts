import { faker } from '@faker-js/faker'
import { Size, SizeProps } from '../../core/domain/value-objects/size'

export const createSize = (data: Partial<SizeProps> = {}): Size => {
  return new Size({
    columns: faker.number.int(),
    rows: faker.number.int(),
    ...data,
  })
}
