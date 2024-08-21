import { Grid } from '../../domain/entities/grid'
import { IGridRepositoryCreate } from '../protocols/grid/grid-repository-create'
import { DbAddGrid, Input } from './db-add-grid'

class StubGridRepository implements IGridRepositoryCreate {
  async create(grid: Grid): Promise<void> {}
}

type SutType = {
  createRepositoryStub: IGridRepositoryCreate
  sut: DbAddGrid
}
const makeSut = (): SutType => {
  const createRepositoryStub = new StubGridRepository()
  const sut = new DbAddGrid(createRepositoryStub)
  return {
    createRepositoryStub,
    sut,
  }
}

const makeInput = (
  data: { rows: number; columns: number } = { rows: 10, columns: 10 },
): Input => {
  const { rows, columns } = data
  return {
    size: {
      rows,
      columns,
    },
  }
}

describe('testing DbAddGrid', () => {
  it('throws if Size.create is invalid', async () => {
    // Arrange
    const { sut } = makeSut()
    const input = makeInput({ rows: -1, columns: -2 })

    // Act
    const execution = sut.execute(input)

    // Assert
    await expect(() => execution).rejects.toThrow()
  })

  it('throws if Grid.create is invalid', async () => {
    // Arrange
    const { sut } = makeSut()
    const input = makeInput({ rows: -1, columns: -2 })

    // Act
    const execution = sut.execute(input)

    // Assert
    await expect(() => execution).rejects.toThrow()
  })
})
