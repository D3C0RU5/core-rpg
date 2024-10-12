import { JwtPayload } from './interface/jwt-payload'

export interface ITokenGenerator {
  generate(payload: JwtPayload): Promise<string>
}
