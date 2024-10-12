import { ITokenGenerator } from '../../../core/usecases/protocols/criptography/token-generator'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator {
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
}
