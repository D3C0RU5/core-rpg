import { User } from '../../../domain/entities/user/user'

export interface IUserRepositoryGetAll {
  getAll(): Promise<User[]>
}
