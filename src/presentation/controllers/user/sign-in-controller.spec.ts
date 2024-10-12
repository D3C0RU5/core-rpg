import { MissingPropertyError } from '../errors/missing-property-error'
import {
  createBaseError,
  createGenericError,
} from '../../../utils/factories/error-factory'
import {
  ISignInUseCase,
  SignInProps,
} from '../../../core/domain/usecases/sign-in-user'
import { faker } from '@faker-js/faker/.'
import { SignInController } from './sign-in-controller'

const fakeToken = faker.string.uuid()
class SignInUseCaseStub implements ISignInUseCase {
  async execute(input: SignInProps): Promise<string> {
    return Promise.resolve(fakeToken)
  }
}

const makeSut = () => {
  const signInUseCaseStub = new SignInUseCaseStub()
  const sut = new SignInController(signInUseCaseStub)

  return { signInUseCaseStub, sut }
}

const makeFakeRequest = (
  body: {
    email?: string
    password?: string
  } = {},
) => {
  return {
    body: {
      email: 'valid@mail.com',
      password: 'valid-password',
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
    expect(result.body).toEqual({ token: fakeToken })
  })

  it('signInUseCase.execute calls corretly', async () => {
    // Arrange
    const { sut, signInUseCaseStub } = makeSut()
    const request = makeFakeRequest()
    const signInUseCaseSpy = jest.spyOn(signInUseCaseStub, 'execute')

    // Act
    await sut.handle(request)

    // Assert
    expect(signInUseCaseSpy).toHaveBeenCalledWith({
      email: request.body.email,
      password: request.body.password,
    })
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

  it('return 400 when signInUseCase throws with a BaseError', async () => {
    // Arrange
    const { sut, signInUseCaseStub } = makeSut()
    const request = makeFakeRequest()

    const expectedError = createBaseError()
    jest
      .spyOn(signInUseCaseStub, 'execute')
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
    const { sut, signInUseCaseStub } = makeSut()
    const request = makeFakeRequest()

    const expectedError = createGenericError()
    jest
      .spyOn(signInUseCaseStub, 'execute')
      .mockRejectedValueOnce(expectedError)

    // Act
    const result = await sut.handle(request)

    // Assert
    expect(result.statusCode).toBe(500)
    expect(result.body.name).toBe(expectedError.name)
    expect(result.body.message).toBe(expectedError.message)
  })
})
