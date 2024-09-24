import { User } from '../../domain/entities/user/user'
import { invalidEmailError } from '../../domain/value-objects/email/errors/invalid-email-error'
import { missingRequirementsPasswordError } from '../../domain/value-objects/password/errors/missing-requirements-password-error'
import { ICriptographyHash } from '../protocols/criptography/hash'
import {
  DbCreateUserUseCase,
  ICreateUserRepositoryAggregation,
} from './db-create-user'
import { emailAlreadyInUseError } from './errors/email-already-in-use-error'

class UserRepositoryStub implements ICreateUserRepositoryAggregation {
  async create(user: User): Promise<void> {
    Promise.resolve()
  }
  async isEmailInUse(value: string): Promise<boolean> {
    return Promise.resolve(false)
  }
}

class CriptographyStub implements ICriptographyHash {
  hash(value: string): string {
    return 'hashed_password'
  }
}

type SutProps = {
  sut: DbCreateUserUseCase
  userRepositoryStub: UserRepositoryStub
  criptographyStub: ICriptographyHash
}
const makeSut = (): SutProps => {
  const userRepositoryStub = new UserRepositoryStub()
  const criptographyStub = new CriptographyStub()
  const sut = new DbCreateUserUseCase(userRepositoryStub, criptographyStub)

  return { sut, userRepositoryStub, criptographyStub }
}

const fakeInput = {
  name: 'fake-name',
  email: 'fake@mail.com',
  password: 'fake_password123',
}

describe('DbCreateUserUseCase unit test', () => {
  it('Create user when is valid', async () => {
    // Arrange
    const { sut, userRepositoryStub } = makeSut()

    // Mock
    const createSpy = jest.spyOn(userRepositoryStub, 'create')

    // Act
    await sut.execute(fakeInput)

    // Assert
    expect(createSpy).toHaveBeenCalled()
    const call = createSpy.mock.calls[0][0]
    expect(call).toBeInstanceOf(User)
    expect(call.Name).toBe(fakeInput.name)
    expect(call.Email).toBe(fakeInput.email)
    expect(call.HashedPassword).toBe('hashed_password')
  })

  it('throws emailAlreadyInUseError when isEmailInUse returns true', async () => {
    // Arrange
    const { sut, userRepositoryStub } = makeSut()

    // Mock
    jest.spyOn(userRepositoryStub, 'isEmailInUse').mockResolvedValueOnce(true)

    // Act
    const act = () => sut.execute(fakeInput)

    // Assert
    await expect(act).rejects.toThrow(emailAlreadyInUseError(fakeInput.email))
  })

  it('throws emailAlreadyInUseError when isEmailInUse throws', async () => {
    // Arrange
    const { sut, userRepositoryStub } = makeSut()

    const expectedError = new Error('error')
    // Mock
    jest
      .spyOn(userRepositoryStub, 'isEmailInUse')
      .mockRejectedValueOnce(expectedError)

    // Act
    const act = () => sut.execute(fakeInput)

    // Assert
    await expect(act).rejects.toThrow(expectedError)
  })

  it('throws when password is invalid', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidPassword = 'invalidpassword'

    // Act
    const act = () => sut.execute({ ...fakeInput, password: invalidPassword })

    // Assert
    await expect(act).rejects.toThrow(
      missingRequirementsPasswordError('invalidpassword'),
    )
  })

  it('throws when hash throws', async () => {
    // Arrange
    const { sut, criptographyStub } = makeSut()

    const expectedError = new Error('error')
    // Mock
    jest.spyOn(criptographyStub, 'hash').mockImplementationOnce(() => {
      throw expectedError
    })

    // Act
    const act = () => sut.execute(fakeInput)

    // Assert
    await expect(act).rejects.toThrow(expectedError)
  })

  it('throws when email is invalid', async () => {
    // Arrange
    const { sut } = makeSut()
    const invalidEmail = 'invalid_email'

    // Act
    const act = () => sut.execute({ ...fakeInput, email: invalidEmail })

    // Assert
    await expect(act).rejects.toThrow(invalidEmailError('invalid_email'))
  })

  it('throws when hash throws', async () => {
    // Arrange
    const { sut, userRepositoryStub } = makeSut()

    const expectedError = new Error('error')
    // Mock
    jest
      .spyOn(userRepositoryStub, 'create')
      .mockRejectedValueOnce(expectedError)

    // Act
    const act = () => sut.execute(fakeInput)

    // Assert
    await expect(act).rejects.toThrow(expectedError)
  })
})
