import { UseCase } from './usecase'

export type SignInProps = {
  email: string
  password: string
}

export abstract class ISignInUseCase implements UseCase {
  abstract execute(input: SignInProps): Promise<string>
}
