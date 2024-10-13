import { UserPayload } from './interface/user-payload'

export interface ITokenVerifier {
  verify(token: string): UserPayload
}
