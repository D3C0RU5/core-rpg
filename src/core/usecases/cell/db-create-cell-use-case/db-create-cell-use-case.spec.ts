import { Cell } from '../../../domain/entities/cell'
import { ICellRepositoryCreate } from '../../protocols/cell/cell-repository-create'
import { IGridRepositoryExists } from '../../protocols/grid/grid-repository-exists'
import { DbCreateCellUseCase } from '.'
import { gridNotFoundError } from './errors/grid-not-found-error'
import { Position } from '../../../domain/value-objects/position'
import { InputCreateCell } from '../../../domain/usecases/db-create-cell'
import { ICellRepositoryAlreadyExistsInPosition } from '../../protocols/cell/cell-repository-already-exists-in-position'
import { invalidGridInPositionError } from './errors/invalid-grid-in-position-error'

class GridRepositoryStub implements IGridRepositoryExists {
  exists(gridId: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}

class CellRepositoryStub
  implements ICellRepositoryCreate, ICellRepositoryAlreadyExistsInPosition
{
  create(grid: Cell): Promise<void> {
    return Promise.resolve()
  }
  alreadyExistsInPosition(cell: Cell): Promise<boolean> {
    return Promise.resolve(true)
  }
}

type SutTypes = {
  gridRepositoryStub: GridRepositoryStub
  cellRepositoryStub: CellRepositoryStub
  sut: DbCreateCellUseCase
}
const makeSut = (): SutTypes => {
  const gridRepositoryStub = new GridRepositoryStub()
  const cellRepositoryStub = new CellRepositoryStub()

  const sut = new DbCreateCellUseCase(gridRepositoryStub, cellRepositoryStub)

  return {
    gridRepositoryStub,
    cellRepositoryStub,
    sut,
  }
}

const makeInput = (): InputCreateCell => ({
  gridId: 'fake-grid-id',
  position: {
    row: 10,
    column: 20,
  },
  walkable: true,
})

const fakeCell = () => {
  const position = new Position({ column: 10, row: 20 })
  return new Cell({
    cellId: 'fake-cell-uuid',
    gridId: 'fake-grid-uuid',
    position,
    walkable: true,
  })
}

describe('DbCreateCellUseCase', () => {
  let cellCreateSpy: jest.SpyInstance

  beforeEach(() => {
    cellCreateSpy = jest.spyOn(Cell, 'create').mockReturnValue(fakeCell())
  })
  it('Throw if gridRepository.exists throws', async () => {
    // Arrange
    const { sut, gridRepositoryStub } = makeSut()
    const input = makeInput()

    // Arrange (mock)
    jest
      .spyOn(gridRepositoryStub, 'exists')
      .mockRejectedValueOnce(new Error('any error'))

    // Act
    const act = async () => await sut.execute(input)

    // Assert
    await expect(act()).rejects.toThrow('any error')
  })

  it('Throw if gridRepository.exists returns false', async () => {
    // Arrange
    const { sut, gridRepositoryStub } = makeSut()
    const input = makeInput()

    // Arrange (mock)
    jest.spyOn(gridRepositoryStub, 'exists').mockResolvedValueOnce(false)

    // Act
    const act = async () => await sut.execute(input)

    // Assert
    await expect(act()).rejects.toThrow(gridNotFoundError(input.gridId))
  })

  it('Throw if Cell.create throws', async () => {
    // Arrange
    const { sut } = makeSut()
    const input = makeInput()

    // Arrange (mock)
    cellCreateSpy.mockImplementation(() => {
      throw new Error('any error')
    })

    // Act
    const act = async () => await sut.execute(input)

    // Assert
    await expect(act()).rejects.toThrow('any error')
  })

  it('Throw if cellRepository.alreadyExistsInPosition throws', async () => {
    // Arrange
    const { sut, cellRepositoryStub } = makeSut()
    const input = makeInput()

    // Arrange (mock)
    jest
      .spyOn(cellRepositoryStub, 'alreadyExistsInPosition')
      .mockRejectedValueOnce(new Error('any error'))

    // Act
    const act = async () => await sut.execute(input)

    // Assert
    await expect(act()).rejects.toThrow('any error')
  })

  it('Throw if cellRepository.alreadyExistsInPosition returns false', async () => {
    // Arrange
    const { sut, cellRepositoryStub } = makeSut()
    const input = makeInput()
    const position = new Position({
      row: input.position.row,
      column: input.position.column,
    })

    // Arrange (mock)
    jest
      .spyOn(cellRepositoryStub, 'alreadyExistsInPosition')
      .mockResolvedValueOnce(false)

    // Act
    const act = async () => await sut.execute(input)

    // Assert
    await expect(act()).rejects.toThrow(invalidGridInPositionError(position))
  })

  it('Throw if cellRepository.create throws', async () => {
    // Arrange
    const { sut, cellRepositoryStub } = makeSut()
    const input = makeInput()

    // Arrange (mock)
    jest
      .spyOn(cellRepositoryStub, 'create')
      .mockRejectedValueOnce(new Error('any error'))

    // Act
    const act = async () => await sut.execute(input)

    // Assert
    await expect(act()).rejects.toThrow('any error')
  })

  it('Return snapshot if successful', async () => {
    // Arrange
    const { sut } = makeSut()
    const input = makeInput()

    // Act
    const snapshot = await sut.execute(input)

    // Assert
    expect(snapshot).toEqual(fakeCell().toSnapshot())
  })
})
