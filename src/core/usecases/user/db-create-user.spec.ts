import { User } from '../../domain/entities/user/user'
import { invalidEmailError } from '../../domain/value-objects/email/errors/invalid-email-error'
import { missingRequirementsPasswordError } from '../../domain/value-objects/password/errors/missing-requirements-password-error'
import { ICriptographyHash } from '../protocols/criptography/hash'
import { IUserRepositoryCreate } from '../protocols/user/user-repository-create'
import { IUserRepositoryEmailInUse } from '../protocols/user/user-repository-email-in-use'
import { DbCreateUserUseCase } from './db-create-user'
import { emailAlreadyInUseError } from './errors/email-already-in-use-error'

class UserCreateRepositoryStub implements IUserRepositoryCreate {
  async create(user: User): Promise<void> {
    Promise.resolve()
  }
}
class EmailInUseRepositoryStub implements IUserRepositoryEmailInUse {
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
  userCreateRepositoryStub: UserCreateRepositoryStub
  emailInUseRepositoryStub: EmailInUseRepositoryStub
  criptographyStub: ICriptographyHash
}
const makeSut = (): SutProps => {
  const userCreateRepositoryStub = new UserCreateRepositoryStub()
  const emailInUseRepositoryStub = new EmailInUseRepositoryStub()
  const criptographyStub = new CriptographyStub()
  const sut = new DbCreateUserUseCase(
    userCreateRepositoryStub,
    emailInUseRepositoryStub,
    criptographyStub,
  )

  return {
    sut,
    userCreateRepositoryStub,
    emailInUseRepositoryStub,
    criptographyStub,
  }
}

const fakeInput = {
  name: 'fake-name',
  email: 'fake@mail.com',
  password: 'fake_password123',
}

describe('DbCreateUserUseCase unit test', () => {
  it('Create user when is valid', async () => {
    // Arrange
    const { sut, userCreateRepositoryStub } = makeSut()

    // Mock
    const createSpy = jest.spyOn(userCreateRepositoryStub, 'create')

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
    const { sut, emailInUseRepositoryStub } = makeSut()

    // Mock
    jest
      .spyOn(emailInUseRepositoryStub, 'isEmailInUse')
      .mockResolvedValueOnce(true)

    // Act
    const act = () => sut.execute(fakeInput)

    // Assert
    await expect(act).rejects.toThrow(emailAlreadyInUseError(fakeInput.email))
  })

  it('throws emailAlreadyInUseError when isEmailInUse throws', async () => {
    // Arrange
    const { sut, emailInUseRepositoryStub } = makeSut()

    const expectedError = new Error('error')
    // Mock
    jest
      .spyOn(emailInUseRepositoryStub, 'isEmailInUse')
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
    const { sut, userCreateRepositoryStub } = makeSut()

    const expectedError = new Error('error')
    // Mock
    jest
      .spyOn(userCreateRepositoryStub, 'create')
      .mockRejectedValueOnce(expectedError)

    // Act
    const act = () => sut.execute(fakeInput)

    // Assert
    await expect(act).rejects.toThrow(expectedError)
  })
})
