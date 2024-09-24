import { User } from '../../domain/entities/user/user'
import { UseCase } from '../../domain/usecases/usecase'
import { Password } from '../../domain/value-objects/password'
import { ICriptographyHash } from '../protocols/criptography/hash'
import { IUserRepositoryCreate } from '../protocols/user/user-repository-create'
import { IUserRepositoryEmailInUse } from '../protocols/user/user-repository-email-in-use'
import { emailAlreadyInUseError } from './errors/email-already-in-use-error'

export type Input = {
  name: string
  email: string
  password: string
}

type UserRepositoryAggregation = IUserRepositoryCreate &
  IUserRepositoryEmailInUse

export class DbCreateUserUseCase implements UseCase {
  constructor(
    private readonly userRepository: UserRepositoryAggregation,
    private readonly criptography: ICriptographyHash,
  ) {}

  async execute({ name, email, ...input }: Input): Promise<void> {
    const isEmailInUse = await this.userRepository.isEmailInUse(email)
    if (isEmailInUse) throw emailAlreadyInUseError(email)

    const password = Password.create(input.password)
    const hashedPassword = this.criptography.hash(password.Value)

    const user = User.create(name, email, hashedPassword)

    await this.userRepository.create(user)
  }
}
