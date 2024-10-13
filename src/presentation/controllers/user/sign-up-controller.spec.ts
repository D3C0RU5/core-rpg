import { MissingPropertyError } from '../errors/missing-property-error'
import {
  createBaseError,
  createGenericError,
} from '../../../utils/factories/error-factory'
import { SignUpController } from './sign-up-controller'
import {
  ICreateUserUseCase,
  InputCreateUser,
} from '../../../core/domain/usecases/db-create-user'
import { InvalidPropertyError } from '../errors/invalid-property-error'

class CreateUserUseCaseStub implements ICreateUserUseCase {
  async execute(input: InputCreateUser): Promise<void> {
    Promise.resolve()
  }
}

const makeSut = () => {
  const useCaseStub = new CreateUserUseCaseStub()
  const sut = new SignUpController(useCaseStub)

  return { useCaseStub, sut }
}

const makeFakeRequest = (
  body: {
    name?: string
    email?: string
    password?: string
    passwordConfirmation?: string
  } = {},
) => {
  return {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any-password',
      passwordConfirmation: 'any-password',
      ...body,
    },
  }
}

describe('SignUpController', () => {
  it('return OK when has success', async () => {
    // Arrange
    const { sut } = makeSut()
    const request = makeFakeRequest()

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(200)
  })

  it('signInUseCase.execute calls corretly', async () => {
    // Arrange
    const { sut, useCaseStub } = makeSut()
    const request = makeFakeRequest()
    const executeSpy = jest.spyOn(useCaseStub, 'execute')

    // Act
    await sut.handle(request)

    // Assert
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    })
  })

  it('return 400 with error when name is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({ name: undefined })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'name')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when email is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({ email: undefined })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'email')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when password is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({ password: undefined })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError('body', 'password')
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when passwordConfirmation is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({ passwordConfirmation: undefined })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new MissingPropertyError(
      'body',
      'passwordConfirmation',
    )
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })

  it('return 400 with error when password is different then passwordConfirmation is missing', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidRequest = makeFakeRequest({
      password: 'any_password',
      passwordConfirmation: 'invalid-password',
    })

    // Act
    const result = await sut.handle(invalidRequest)

    // Assert
    expect(result.statusCode).toBe(400)
    const expectedError = new InvalidPropertyError('password', {
      message: 'Password not matches with confirmation',
    })
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
