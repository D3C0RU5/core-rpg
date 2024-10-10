import { User } from '../../../domain/entities/user/user'

export interface IUserRepositoryGetByEmail {
  getByEmail(email: string): Promise<User | null>
}
