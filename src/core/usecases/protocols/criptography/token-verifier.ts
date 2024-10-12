import { JwtPayload } from './interface/jwt-payload'

export interface ITokenVerifier {
  verify(token: string): JwtPayload
}
