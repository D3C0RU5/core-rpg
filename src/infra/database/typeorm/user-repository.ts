import { User } from '../../../core/domain/entities/user/user'
import { UserModel } from './models/user'
import { IUserRepositoryCreate } from '../../../core/usecases/protocols/user/user-repository-create'
import { IUserRepositoryEmailInUse } from '../../../core/usecases/protocols/user/user-repository-email-in-use'
import { Repository } from 'typeorm'
import { AppDataSource } from './config/datasource'
import { IUserRepositoryGetAll } from '../../../core/usecases/protocols/user/user-repository-get-all'

export class UserRepository
  implements
    IUserRepositoryCreate,
    IUserRepositoryEmailInUse,
    IUserRepositoryGetAll
{
  private readonly repository: Repository<UserModel>

  constructor() {
    this.repository = AppDataSource.getRepository(UserModel)
  }

  async create(user: User): Promise<void> {
    this.repository.insert({
      userId: user.Id,
      name: user.Name,
      email: user.Email,
      hashedPassword: user.HashedPassword,
    })
  }

  async isEmailInUse(value: string): Promise<boolean> {
    return await this.repository.exists({ where: { email: value } })
  }

  async getAll(): Promise<User[]> {
    const allUsersFromDb = await this.repository.find()
    return allUsersFromDb.map(_user => _user.mapToUser())
  }
}
