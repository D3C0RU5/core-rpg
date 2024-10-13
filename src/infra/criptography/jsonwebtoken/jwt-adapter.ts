import { ITokenGenerator } from '../../../core/usecases/protocols/criptography/token-generator'
import jwt from 'jsonwebtoken'
import { ITokenVerifier } from '../../../core/usecases/protocols/criptography/token-verifier'
import { invalidTokenError } from './error/invalid-token-error'
import { UserPayload } from '../../../core/usecases/protocols/criptography/interface/user-payload'

export class JwtAdapter implements ITokenGenerator, ITokenVerifier {
  private readonly options: jwt.SignOptions
  constructor(
    private readonly secret: string,
    expirationHours: number,
  ) {
    this.options = { expiresIn: `${expirationHours}h` }
  }

  async generate(payload: UserPayload): Promise<string> {
    return jwt.sign(payload, this.secret, this.options)
  }

  verify(token: string): UserPayload {
    try {
      return jwt.verify(token, this.secret) as UserPayload
    } catch (error) {
      throw invalidTokenError(error)
    }
  }
}
