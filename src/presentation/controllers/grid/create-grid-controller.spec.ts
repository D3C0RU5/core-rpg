import { MissingPropertyError } from '../errors/missing-property-error'
import {
  createBaseError,
  createGenericError,
} from '../../../utils/factories/error-factory'
import {
  ICreateGridUseCase,
  InputCreateGrid,
} from '../../../core/domain/usecases/db-create-grid'
import { CreateGridController } from './create-grid-controller'
import { faker } from '@faker-js/faker/.'

const fakeGridId = faker.string.uuid()
class DbCreateGridUseCaseStub implements ICreateGridUseCase {
  async execute(input: InputCreateGrid): Promise<string> {
    return Promise.resolve(fakeGridId)
  }
}

const makeSut = () => {
  const useCaseStub = new DbCreateGridUseCaseStub()
  const sut = new CreateGridController(useCaseStub)

  return { useCaseStub, sut }
}

const makeFakeRequest = (
  body: {
    rows?: number
    columns?: number
  } = {},
) => {
  return {
    body: {
      rows: 1,
      columns: 2,
      ...body,
    },
  }
}

describe('CreateGridController', () => {
  it('return OK when has success', async () => {
    // Arrange
    const { sut } = makeSut()
    const request = makeFakeRequest()

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(200)
    expect(result.body.gridId).toBe(fakeGridId)
  })

  it('usecase calls corretly', async () => {
    // Arrange
    const { sut, useCaseStub } = makeSut()
    const request = makeFakeRequest()
    const executeSpy = jest.spyOn(useCaseStub, 'execute')

    // Act
    await sut.handle(request)

    // Assert
    expect(executeSpy).toHaveBeenCalledWith({
      size: { rows: request.body.rows, columns: request.body.columns },
    })
  })

  it('return 400 with error when rows is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({ rows: undefined })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'rows')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when columns is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({ columns: undefined })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'columns')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 when execute throws with a BaseError', async () => {
    // Arrange
    const { sut, useCaseStub } = makeSut()
    const request = makeFakeRequest()

    const expectedError = createBaseError()
    jest.spyOn(useCaseStub, 'execute').mockRejectedValueOnce(expectedError)

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(400)
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 500 when execute throws with a GenericError', async () => {
    // Arrange
    const { sut, useCaseStub } = makeSut()
    const request = makeFakeRequest()

    const expectedError = createGenericError()
    jest.spyOn(useCaseStub, 'execute').mockRejectedValueOnce(expectedError)

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(500)
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })
})
