import { SignInUseCase } from '../../../../core/usecases/user/sign-in'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jsonwebtoken/jwt-adapter'
import { UserRepository } from '../../../../infra/database/typeorm/user-repository'
import env from '../../../config/env'

export const makeSignInUseCase = (): SignInUseCase => {
  const userRepository = new UserRepository()
  const bcrypterAdapter = new BcryptAdapter(env.SALT)
  const jwtAdapter = new JwtAdapter(env.SECRET, env.EXPIRATION_HOURS)

  return new SignInUseCase(userRepository, bcrypterAdapter, jwtAdapter)
}
