import { User } from '../../domain/entities/user/user'
import {
  ICreateUserUseCase,
  InputCreateUser,
} from '../../domain/usecases/db-create-user'
import { Password } from '../../domain/value-objects/password'
import { Hasher } from '../protocols/criptography/hasher'
import { IUserRepositoryCreate } from '../protocols/user/user-repository-create'
import { IUserRepositoryEmailInUse } from '../protocols/user/user-repository-email-in-use'
import { emailAlreadyInUseError } from './errors/email-already-in-use-error'

export class DbCreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly createUserRepository: IUserRepositoryCreate,
    private readonly isEmailInUseRepository: IUserRepositoryEmailInUse,
    private readonly criptography: Hasher,
  ) {}

  async execute({ name, email, ...input }: InputCreateUser): Promise<void> {
    const isEmailInUse = await this.isEmailInUseRepository.isEmailInUse(email)
    if (isEmailInUse) throw emailAlreadyInUseError(email)

    const password = Password.create(input.password)
    const hashedPassword = await this.criptography.hash(password.Value)

    const user = User.create(name, email, hashedPassword)

    await this.createUserRepository.create(user)
  }
}
