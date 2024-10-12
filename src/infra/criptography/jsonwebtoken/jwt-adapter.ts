import { ITokenGenerator } from '../../../core/usecases/protocols/criptography/token-generator'
import jwt from 'jsonwebtoken'
import { ITokenVerifier } from '../../../core/usecases/protocols/criptography/token-verifier'
import { invalidTokenError } from './error/invalid-token-error'
import { JwtPayload } from '../../../core/usecases/protocols/criptography/interface/jwt-payload'

export class JwtAdapter implements ITokenGenerator, ITokenVerifier {
  private readonly options: jwt.SignOptions
  constructor(
    private readonly secret: string,
    expirationHours: number,
  ) {
    this.options = { expiresIn: `${expirationHours}h` }
  }

  async generate(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret, this.options)
  }

  verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret) as JwtPayload
    } catch (error) {
      throw invalidTokenError(error)
    }
  }
}
