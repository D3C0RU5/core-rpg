import { AppDataSource } from './config/datasource'
import { CellModel } from './models/cell'
import { createCell } from '../../../utils/factories/cell-factory'
import { CellRepository } from './cell-repository'
import { createPosition } from '../../../utils/factories/position-factory'
import { Cell } from '../../../core/domain/entities/cell'

const makeSut = () => new CellRepository()
const repository = AppDataSource.getRepository(CellModel)

describe('CellRepository', () => {
  beforeEach(async () => {
    await AppDataSource.initialize()
  })

  afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
  })

  describe('When call create', () => {
    it('Should create cell', async () => {
      // Arrange
      const cell = createCell()
      const sut = makeSut()

      // Act
      await sut.create(cell)

      // Assert

      const all = await repository.find()
      expect(all.length).toBe(1)
    })
  })

  describe('When call alreadyExistsInPosition', () => {
    const insertCell = async (cell: Cell) => {
      repository.insert({
        cellId: cell.Id,
        gridId: cell.GridId,
        row: cell.Position.Row,
        column: cell.Position.Column,
        walkable: cell.Walkable,
      })
    }

    it('Should return false when not exists cells', async () => {
      // Arrange
      const sut = makeSut()
      const cell = createCell()

      // Act
      const result = await sut.alreadyExistsInPosition(cell)

      // Assert
      expect(result).toBe(false)
    })

    it('Should return false when not exists cell in position', async () => {
      // Arrange
      const sut = makeSut()
      const position = createPosition({ column: 1, row: 1 })

      const cell = createCell({ gridId: 'grid-id', position })
      await insertCell(cell)

      const newCell = createCell({
        gridId: 'grid-id',
        position: createPosition({ column: 2, row: 1 }),
      })

      // Act
      const cellExists = await sut.alreadyExistsInPosition(newCell)

      // Assert
      expect(cellExists).toBe(false)
    })

    it('Should return false when not exists cell in position', async () => {
      // Arrange
      const sut = makeSut()
      const position = createPosition({ column: 1, row: 1 })

      const cell = createCell({ gridId: 'grid-id', position })
      await insertCell(cell)

      // Act
      const cellExists = await sut.alreadyExistsInPosition(cell)

      // Assert
      expect(cellExists).toBe(true)
    })
  })
})
