import { AppDataSource } from './config/datasource'
import { GridModel } from './models/grid'
import { createGrid } from '../../../utils/factories/grid-factory'
import { GridRepository } from './grid-repository'

const makeSut = () => new GridRepository()
const repository = AppDataSource.getRepository(GridModel)

describe('GridRepository', () => {
  beforeEach(async () => {
    await AppDataSource.initialize()
  })

  afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
  })

  describe('When call create', () => {
    it('Should create grid', async () => {
      // Arrange
      const grid = createGrid()
      const sut = makeSut()

      // Act
      await sut.create(grid)

      // Assert

      const all = await repository.find()
      expect(all.length).toBe(1)
    })
  })

  describe('When call exists', () => {
    it('Should return true when exists grid with Id', async () => {
      // Arrange
      const grid = createGrid()
      const sut = makeSut()
      await repository.insert({
        gridId: grid.Id,
        columns: grid.Size.Columns,
        rows: grid.Size.Rows,
      })

      // Act
      const userExists = await sut.exists(grid.Id)

      // Assert
      expect(userExists).toBe(true)
    })

    it('Should return false when not exists grid with Id', async () => {
      // Arrange
      const gridId = 'unexistent-id'
      const sut = makeSut()

      // Act
      const userExists = await sut.exists(gridId)

      // Assert
      expect(userExists).toBe(false)
    })
  })
})
