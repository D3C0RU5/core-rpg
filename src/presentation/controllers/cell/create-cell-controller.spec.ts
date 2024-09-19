import { CreateCellController } from './create-cell-controller'
import { createCell } from '../../../utils/factories/cell-factory'
import { MissingPropertyError } from '../errors/missing-property-error'
import {
  createBaseError,
  createGenericError,
} from '../../../utils/factories/error-factory'
import { CellSnapshot } from '../../../core/domain/entities/cell'
import { ICreateCellUseCase } from '../../../core/domain/usecases/db-create-cell'

const fakeCreatedCell = createCell().toSnapshot()

class CreateCellUseCaseStub implements ICreateCellUseCase {
  execute(): Promise<CellSnapshot> {
    return Promise.resolve(fakeCreatedCell)
  }
}

type SutTypes = {
  createCellUseCaseStub: ICreateCellUseCase
  sut: CreateCellController
}
const makeSut = (): SutTypes => {
  const createCellUseCaseStub = new CreateCellUseCaseStub()
  const sut = new CreateCellController(createCellUseCaseStub)

  return { createCellUseCaseStub, sut }
}

const makeFakeRequest = (
  body: {
    gridId?: string
    position?: { row?: number; column?: number }
    walkable?: boolean
  } = {},
) => {
  return {
    body: {
      gridId: 'valid-grid-id',
      position: { row: 1, column: 1 },
      walkable: true,
      ...body,
    },
  }
}
describe('CreateCellController', () => {
  it('return OK when has success', async () => {
    // Arrange
    const { sut } = makeSut()
    const request = makeFakeRequest()

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(fakeCreatedCell)
  })

  it('return 400 with error when gridId is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({ gridId: undefined })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'gridId')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when position is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({ position: undefined })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'position')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when position.row is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({
      position: { row: undefined, column: 1 },
    })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'position.row')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when position.column is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({
      position: { row: 1, column: undefined },
    })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'position.column')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when gridId is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({
      position: { row: 1, column: undefined },
    })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'position.column')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 when createCell throws with a BaseError', async () => {
    // Arrange
    const { sut, createCellUseCaseStub } = makeSut()
    const request = makeFakeRequest()

    const expectedError = createBaseError()
    jest
      .spyOn(createCellUseCaseStub, 'execute')
      .mockRejectedValueOnce(expectedError)

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(400)
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 500 when createCell throws with a GenericError', async () => {
    // Arrange
    const { sut, createCellUseCaseStub } = makeSut()
    const request = makeFakeRequest()

    const expectedError = createGenericError()
    jest
      .spyOn(createCellUseCaseStub, 'execute')
      .mockRejectedValueOnce(expectedError)

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(500)
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })
})
