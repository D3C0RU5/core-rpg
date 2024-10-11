import { createUser } from '../../../utils/factories/user-factory'
import { UserRepository } from './user-repository'
import { AppDataSource } from './config/datasource'
import { UserModel } from './models/user'
import { faker } from '@faker-js/faker/.'

const makeSut = () => new UserRepository()
const repository = AppDataSource.getRepository(UserModel)

describe('UserRepository', () => {
  beforeEach(async () => {
    await AppDataSource.initialize()
  })

  afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
  })

  describe('When call create', () => {
    it('Should create user', async () => {
      // Arrange
      const user = createUser()
      const sut = makeSut()

      // Act
      await sut.create(user)

      // Assert

      const all = await repository.find()
      expect(all.length).toBe(1)
    })
  })

  describe('When call isEmailInUse', () => {
    it('Should return true when exists user with email', async () => {
      // Arrange
      const user = createUser()
      const sut = makeSut()

      // Act
      await repository.insert({
        userId: user.Id,
        name: user.Name,
        email: user.Email,
        hashedPassword: user.HashedPassword,
      })
      const userExists = await sut.isEmailInUse(user.Email)

      // Assert
      expect(userExists).toBe(true)
    })
    it('Should return false when not exists user with email', async () => {
      // Arrange
      const sut = makeSut()

      // Act
      const userExists = await sut.isEmailInUse('invalid@email.com')

      // Assert
      expect(userExists).toBe(false)
    })
  })
  describe('When call getAll', () => {
    it('Should return empty when there is no users', async () => {
      // Arrange
      const sut = makeSut()

      // Act
      const result = await sut.getAll()

      // Assert
      expect(result.length).toBe(0)
    })

    it('Should return all existent users when there is users', async () => {
      // Arrange
      const sut = makeSut()

      const firstUser = createUser()
      await repository.insert({
        userId: firstUser.Id,
        name: firstUser.Name,
        email: firstUser.Email,
        hashedPassword: firstUser.HashedPassword,
      })

      const secondUser = createUser()
      await repository.insert({
        userId: secondUser.Id,
        name: secondUser.Name,
        email: secondUser.Email,
        hashedPassword: secondUser.HashedPassword,
      })

      // Act
      const result = await sut.getAll()

      // Assert
      expect(result.length).toBe(2)
    })
  })
  describe('When call getByEmail', () => {
    it('Return empty when user exists with received email', async () => {
      // Arrange
      const sut = makeSut()
      const email = faker.internet.email()

      // Act
      const result = await sut.getByEmail(email)

      // Assert
      expect(result).toBe(null)
    })

    it('Return existing user with received email', async () => {
      // Arrange
      const sut = makeSut()
      const email = faker.internet.email()

      const user = createUser({ email })
      const userModel = UserModel.fromEntity(user)
      await repository.insert(userModel)

      // Act
      const result = await sut.getByEmail(email)

      // Assert
      expect(result).toEqual(user)
    })
  })

  describe('When call update', () => {
    it('Update user token if user exists', async () => {
      // Arrange
      const sut = makeSut()
      const userOldValues = createUser()
      await repository.insert(UserModel.fromEntity(userOldValues))

      const userNewValues = createUser({ userId: userOldValues.Id })

      // Act
      await sut.update(userNewValues)

      // Assert
      const updatedUser = await repository.findOneBy({
        userId: userOldValues.Id,
      })
      expect(updatedUser).toEqual(UserModel.fromEntity(userNewValues))
    })
  })
})
