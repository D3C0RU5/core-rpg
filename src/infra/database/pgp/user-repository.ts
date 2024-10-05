import { User } from '../../../core/domain/entities/user/user'
import { IUserRepositoryCreate } from '../../../core/usecases/protocols/user/user-repository-create'
import { IUserRepositoryEmailInUse } from '../../../core/usecases/protocols/user/user-repository-email-in-use'
import { IDatabasePostgresConnection } from './protocols/database-connection'

export class UserRepositoryPostgres
  implements IUserRepositoryCreate, IUserRepositoryEmailInUse
{
  constructor(readonly connection: IDatabasePostgresConnection) {}

  async create(user: User): Promise<void> {
    await this.connection.query(
      'insert into users (user_id, name, email, hashed_password) values ($1, $2, $3, $4)',
      [user.Id, user.Name, user.Email, user.HashedPassword],
    )
  }

  async isEmailInUse(value: string): Promise<boolean> {
    const result = await this.connection.query(
      'SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)',
      [value],
    )
    return result[0]?.record_exists
  }
}
