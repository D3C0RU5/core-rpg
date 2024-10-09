import { faker } from '@faker-js/faker'
import { User, UserProps } from '../../core/domain/entities/user/user'

export const createUser = (data: Partial<UserProps> = {}): User => {
  return new User({
    userId: faker.string.uuid(),
    name: faker.word.words(),
    email: faker.internet.email(),
    hashedPassword: faker.internet.password(),
    token: faker.string.uuid(),
    ...data,
  })
}
