import { createUser } from '../../../utils/factories/user-factory'
import { UserRepository } from './user-repository'
import { AppDataSource } from './config/datasource'
import { UserModel } from './models/user'

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
})
