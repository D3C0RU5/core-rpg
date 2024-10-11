import { User } from '../../../domain/entities/user/user'

export interface IUserRepositoryUpdateToken {
  updateToken(user: User): Promise<void>
}
