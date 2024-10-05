import { createCell } from '../../../utils/factories/cell-factory'
import { CellRepositoryPostgres } from './cell-repository'
import { PgMemoryAdapter } from './helper/pg-mem-adapter'

const connection = PgMemoryAdapter.getInstanceConnection()

const makeSut = () => {
  return new CellRepositoryPostgres(connection)
}

describe('CellRepositoryPostgres', () => {
  describe('create', () => {
    it('should insert value correctly', async () => {
      // Arrange
      const sut = makeSut()
      const cell = createCell()

      // Act
      sut.create(cell)

      // Assert
      const allCells = await connection.query('select * from cells', [])
      expect(allCells.length).toBe(1)
    })
  })
})
