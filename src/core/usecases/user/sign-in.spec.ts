import { faker } from '@faker-js/faker/.'
import { createUser } from '../../../utils/factories/user-factory'
import { User } from '../../domain/entities/user/user'
import { HashCompare } from '../protocols/criptography/compare'
import { ITokenGenerator } from '../protocols/criptography/token-generator'
import { IUserRepositoryGetByEmail } from '../protocols/user/get-user-by-email'
import { IUserRepositoryUpdateToken } from '../protocols/user/update-token'
import { SignInUseCase } from './sign-in'
import { SignInProps } from '../../domain/usecases/sign-in-user'
import { authenticationError } from './errors/authentication-error'

const fakeUserByEmail = createUser()
class UserRepositoryStub
  implements IUserRepositoryGetByEmail, IUserRepositoryUpdateToken
{
  async getByEmail(email: string): Promise<User | null> {
    return Promise.resolve(fakeUserByEmail)
  }
  async updateToken(user: User): Promise<void> {
    return Promise.resolve()
  }
}

class HashCompareStub implements HashCompare {
  async compare(value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}

const fakeToken = faker.string.uuid()
class TokenGeneratorStub implements ITokenGenerator {
  async generate(payload: object): Promise<string> {
    return Promise.resolve(fakeToken)
  }
}

const makeSut = () => {
  const userRepositoryStub = new UserRepositoryStub()
  const hashCompareStub = new HashCompareStub()
  const tokenGeneratorStub = new TokenGeneratorStub()

  const sut = new SignInUseCase(
    userRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
  )

  return { sut, userRepositoryStub, hashCompareStub, tokenGeneratorStub }
}

const makeInput = (): SignInProps => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

describe('SignInUseCase unit test', () => {
  it('should call getByEmail with correctParams', async () => {
    // Arrange
    const { sut, userRepositoryStub } = makeSut()
    const input = makeInput()
    const getByEmailSpy = jest.spyOn(userRepositoryStub, 'getByEmail')

    // Act
    await sut.execute(input)

    // Assert
    expect(getByEmailSpy).toHaveBeenCalledWith(input.email)
  })

  it('should throw when getByEmail returns null', async () => {
    // Arrange
    const { sut, userRepositoryStub } = makeSut()
    const input = makeInput()
    jest.spyOn(userRepositoryStub, 'getByEmail').mockResolvedValueOnce(null)

    // Act/Assert
    await expect(sut.execute(input)).rejects.toThrow(authenticationError())
  })

  it('should throw when getByEmail throws', async () => {
    // Arrange
    const { sut, userRepositoryStub } = makeSut()
    const input = makeInput()
    const error = new Error('any-error')
    jest.spyOn(userRepositoryStub, 'getByEmail').mockRejectedValueOnce(error)

    // Act/Assert
    await expect(sut.execute(input)).rejects.toThrow(error)
  })

  it('should call compare with correctParams', async () => {
    // Arrange
    const { sut, hashCompareStub } = makeSut()
    const input = makeInput()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')

    // Act
    await sut.execute(input)

    // Assert
    expect(compareSpy).toHaveBeenCalledWith(
      input.password,
      fakeUserByEmail.HashedPassword,
    )
  })

  it('should throw when compare returns false', async () => {
    // Arrange
    const { sut, hashCompareStub } = makeSut()
    const input = makeInput()
    jest.spyOn(hashCompareStub, 'compare').mockResolvedValueOnce(false)

    // Act/Assert
    await expect(sut.execute(input)).rejects.toThrow(authenticationError())
  })

  it('should throw when compare throws', async () => {
    // Arrange
    const { sut, hashCompareStub } = makeSut()
    const input = makeInput()
    const error = new Error('any-error')
    jest.spyOn(hashCompareStub, 'compare').mockRejectedValueOnce(error)

    // Act/Assert
    await expect(sut.execute(input)).rejects.toThrow(error)
  })

  it('should call generate with correctParams', async () => {
    // Arrange
    const { sut, tokenGeneratorStub } = makeSut()
    const input = makeInput()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')

    // Act
    await sut.execute(input)

    // Assert
    expect(generateSpy).toHaveBeenCalledWith({
      name: fakeUserByEmail.Name,
      email: fakeUserByEmail.Email,
    })
  })

  it('should throw when generate throws', async () => {
    // Arrange
    const { sut, tokenGeneratorStub } = makeSut()
    const input = makeInput()
    const error = new Error('any-error')
    jest.spyOn(tokenGeneratorStub, 'generate').mockRejectedValueOnce(error)

    // Act/Assert
    await expect(sut.execute(input)).rejects.toThrow(error)
  })

  it('should call updateToken with correctParams', async () => {
    // Arrange
    const { sut, userRepositoryStub } = makeSut()
    const input = makeInput()
    const updateTokenSpy = jest.spyOn(userRepositoryStub, 'updateToken')

    // Act
    await sut.execute(input)

    // Assert
    expect(updateTokenSpy).toHaveBeenCalledWith({
      ...fakeUserByEmail,
      token: fakeToken,
    })
  })

  it('should throw when updateToken throws', async () => {
    // Arrange
    const { sut, tokenGeneratorStub } = makeSut()
    const input = makeInput()
    const error = new Error('any-error')
    jest.spyOn(tokenGeneratorStub, 'generate').mockRejectedValueOnce(error)

    // Act/Assert
    await expect(sut.execute(input)).rejects.toThrow(error)
  })

  it('should throw when updateToken throws', async () => {
    // Arrange
    const { sut } = makeSut()
    const input = makeInput()

    // Act
    const token = await sut.execute(input)

    // Act/Assert
    expect(token).toBe(fakeToken)
  })
})
