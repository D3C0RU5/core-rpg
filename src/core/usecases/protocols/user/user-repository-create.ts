import { User } from '../../../domain/entities/user/user'

export interface IUserRepositoryCreate {
  create(user: User): Promise<void>
}
