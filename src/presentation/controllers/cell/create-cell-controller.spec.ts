import { CreateCellController } from './create-cell-controller'
import { MissingPropertyError } from '../errors/missing-property-error'
import {
  createBaseError,
  createGenericError,
} from '../../../utils/factories/error-factory'
import { ICreateCellUseCase } from '../../../core/domain/usecases/db-create-cell'

class CreateCellUseCaseStub implements ICreateCellUseCase {
  execute(): Promise<void> {
    return Promise.resolve()
  }
}

type SutTypes = {
  usecase: ICreateCellUseCase
  sut: CreateCellController
}
const makeSut = (): SutTypes => {
  const usecase = new CreateCellUseCaseStub()
  const sut = new CreateCellController(usecase)

  return { usecase, sut }
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
  })

  it('calls usecase correctly', async () => {
    // Arrange
    const { sut, usecase } = makeSut()
    const request = makeFakeRequest()
    const { gridId, position, walkable } = request.body
    const usecaseSpy = jest.spyOn(usecase, 'execute')

    // Act
    await sut.handle(request)

    // Assert
    expect(usecaseSpy).toHaveBeenCalledWith({
      gridId,
      position,
      walkable,
    })
  })

  it('calls usecase walkable with false when is invalid or undefined', async () => {
    // Arrange
    const { sut, usecase } = makeSut()
    const request = makeFakeRequest({ walkable: undefined })
    const { gridId, position } = request.body
    const usecaseSpy = jest.spyOn(usecase, 'execute')

    // Act
    await sut.handle(request)

    // Assert
    expect(usecaseSpy).toHaveBeenCalledWith({
      gridId,
      position,
      walkable: false,
    })
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

  it('return 400 when usecase throws with a BaseError', async () => {
    // Arrange
    const { sut, usecase } = makeSut()
    const request = makeFakeRequest()

    const expectedError = createBaseError()
    jest.spyOn(usecase, 'execute').mockRejectedValueOnce(expectedError)

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(400)
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 500 when usecase throws with a GenericError', async () => {
    // Arrange
    const { sut, usecase } = makeSut()
    const request = makeFakeRequest()

    const expectedError = createGenericError()
    jest.spyOn(usecase, 'execute').mockRejectedValueOnce(expectedError)

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(500)
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })
})
