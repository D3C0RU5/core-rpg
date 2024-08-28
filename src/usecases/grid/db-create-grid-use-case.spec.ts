import { Grid } from '../../domain/entities/grid'
import { Size } from '../../domain/value-objects/size'
import { IGridRepositoryCreate } from '../protocols/grid/grid-repository-create'
import { DbCreateGridUseCase, Input } from './db-create-grid-use-case'

class StubGridRepository implements IGridRepositoryCreate {
  async create(grid: Grid): Promise<void> {}
}

type SutType = {
  createRepositoryStub: IGridRepositoryCreate
  sut: DbCreateGridUseCase
}
const makeSut = (): SutType => {
  const createRepositoryStub = new StubGridRepository()
  const sut = new DbCreateGridUseCase(createRepositoryStub)
  return {
    createRepositoryStub,
    sut,
  }
}

const makeInput = (): Input => {
  return {
    size: {
      rows: 10,
      columns: 10,
    },
  }
}

const fakeSize = new Size(10, 5)
const fakeGrid = new Grid('grid-id', fakeSize)

describe('testing DbAddGrid', () => {
  beforeEach(() => {
    jest.spyOn(Size, 'create').mockReturnValue(fakeSize)
    jest.spyOn(Grid, 'create').mockReturnValue(fakeGrid)
  })

  it('throws if Size.create is invalid', async () => {
    // Arrange
    const { sut } = makeSut()
    const input = makeInput()

    // Mock
    jest.spyOn(Size, 'create').mockImplementation(() => {
      throw new Error('any error')
    })

    // Act
    const execution = sut.execute(input)

    // Assert
    await expect(() => execution).rejects.toThrow('any error')
  })

  it('throws if Grid.create is invalid', async () => {
    // Arrange
    const { sut } = makeSut()
    const input = makeInput()

    // Mock
    jest.spyOn(Grid, 'create').mockImplementation(() => {
      throw new Error('any error')
    })

    // Act
    const execution = sut.execute(input)

    // Assert
    await expect(() => execution).rejects.toThrow()
  })

  it('call grid create if valid', async () => {
    // Arrange
    const { sut, createRepositoryStub } = makeSut()
    const input = makeInput()

    // Mock
    const createSpy = jest.spyOn(createRepositoryStub, 'create')

    // Act
    const result = await sut.execute(input)

    // Assert
    expect(createSpy).toHaveBeenCalledWith(fakeGrid)
    expect(result).toEqual(fakeGrid.toSnapshot())
  })
})
