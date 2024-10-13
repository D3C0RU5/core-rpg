import { faker } from '@faker-js/faker/.'
import { UserModel } from './user'
import { User } from '../../../../core/domain/entities/user/user'
import { createUser } from '../../../../utils/factories/user-factory'

describe('UserModel', () => {
  describe('mapToEntity', () => {
    it('map User correctly', () => {
      // Assert
      const model = new UserModel()
      model.userId = faker.string.uuid()
      model.name = faker.string.alphanumeric()
      model.email = faker.internet.email()
      model.hashedPassword = faker.string.alphanumeric()
      model.token = faker.string.alphanumeric()

      // Act
      const entity = model.mapToEntity()

      // Assert
      expect(entity).toBeInstanceOf(User)
    })
  })
  describe('fromEntity', () => {
    it('map UserModel correctly', () => {
      // Assert
      const user = createUser()

      // Act
      const model = UserModel.fromEntity(user)

      // Assert
      expect(model).toBeInstanceOf(UserModel)
    })
  })
})
