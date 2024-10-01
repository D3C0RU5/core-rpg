import { UseCase } from './usecase'

export type InputCreateUser = {
  name: string
  email: string
  password: string
}

export abstract class ICreateUserUseCase implements UseCase {
  abstract execute(input: InputCreateUser): Promise<void>
}
