import { DbCreateUserUseCase } from '../../../../core/usecases/user/db-create-user'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt-adapter'
import { UserRepository } from '../../../../infra/database/typeorm/user-repository'

export const makeDbCreateUser = (): DbCreateUserUseCase => {
  const userRepository = new UserRepository()
  const hasher = new BcryptAdapter(10)

  return new DbCreateUserUseCase(userRepository, userRepository, hasher)
}
