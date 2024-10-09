import { createUser } from '../../../utils/factories/user-factory'
import { UserRepository } from './user-repository'
import { AppDataSource } from './config/datasource'

const makeSut = () => new UserRepository()

describe('UserRepository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
  })

  it('create', async () => {
    // Arrange
    const user = createUser()
    const sut = makeSut()

    // Act
    await sut.create(user)

    // Assert
    const all = await sut.getAll()
    expect(all.length).toBe(1)
  })
})
