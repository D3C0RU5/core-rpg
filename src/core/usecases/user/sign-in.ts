import { ISignInUseCase, SignInProps } from '../../domain/usecases/sign-in-user'
import { HashCompare } from '../protocols/criptography/compare'
import { ITokenGenerator } from '../protocols/criptography/token-generator'
import { IUserRepositoryGetByEmail } from '../protocols/user/get-user-by-email'
import { IUserRepositoryUpdate } from '../protocols/user/update'
import { authenticationError } from './errors/authentication-error'

export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly userRepository: IUserRepositoryGetByEmail &
      IUserRepositoryUpdate,
    private readonly hasher: HashCompare,
    private readonly tokenGenerator: ITokenGenerator,
  ) {}

  async execute(input: SignInProps): Promise<string> {
    const user = await this.userRepository.getByEmail(input.email)
    if (!user) {
      throw authenticationError()
    }

    const isValid = await this.hasher.compare(
      input.password,
      user.HashedPassword,
    )
    if (!isValid) {
      throw authenticationError()
    }

    const payload = {
      name: user.Name,
      email: user.Email,
    }
    const token = await this.tokenGenerator.generate(payload)
    user.setToken(token)

    this.userRepository.update(user)

    return token
  }
}
