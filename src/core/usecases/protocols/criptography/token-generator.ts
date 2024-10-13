import { UserPayload } from './interface/user-payload'

export interface ITokenGenerator {
  generate(payload: UserPayload): Promise<string>
}
