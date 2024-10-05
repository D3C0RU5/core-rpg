import { PgPromiseAdapter } from '../../../../infra/database/pgp/helper/pg-promise-adapter'
import { DbCreateUserUseCase } from '../../../../core/usecases/user/db-create-user'
import { UserRepositoryPostgres } from '../../../../infra/database/pgp/user-repository'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt-adapter'

export const makeDbCreateUser = (): DbCreateUserUseCase => {
  const connection = PgPromiseAdapter.getInstanceConnection()
  const userRepository = new UserRepositoryPostgres(connection)
  const hasher = new BcryptAdapter(10)

  return new DbCreateUserUseCase(userRepository, userRepository, hasher)
}
