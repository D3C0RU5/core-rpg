import { ITokenGenerator } from '../../../core/usecases/protocols/criptography/token-generator'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator {
  constructor(
    private readonly secret: string,
    private readonly options: jwt.SignOptions,
  ) {}

  async generate(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret, this.options)
  }
}
