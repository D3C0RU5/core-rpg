import { User } from '../../../domain/entities/user/user'

export interface IUserRepositoryUpdate {
  update(user: User): Promise<void>
}
