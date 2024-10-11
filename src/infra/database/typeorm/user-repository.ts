import { User } from '../../../core/domain/entities/user/user'
import { UserModel } from './models/user'
import { IUserRepositoryCreate } from '../../../core/usecases/protocols/user/user-repository-create'
import { IUserRepositoryEmailInUse } from '../../../core/usecases/protocols/user/user-repository-email-in-use'
import { Repository } from 'typeorm'
import { AppDataSource } from './config/datasource'
import { IUserRepositoryGetAll } from '../../../core/usecases/protocols/user/user-repository-get-all'
import { IUserRepositoryGetByEmail } from '../../../core/usecases/protocols/user/get-user-by-email'
import { IUserRepositoryUpdate } from '../../../core/usecases/protocols/user/update'

export class UserRepository
  implements
    IUserRepositoryCreate,
    IUserRepositoryEmailInUse,
    IUserRepositoryGetAll,
    IUserRepositoryGetByEmail,
    IUserRepositoryUpdate
{
  private readonly repository: Repository<UserModel>

  constructor() {
    this.repository = AppDataSource.getRepository(UserModel)
  }

  async create(user: User): Promise<void> {
    const userModel = UserModel.fromEntity(user)
    await this.repository.insert(userModel)
  }

  async isEmailInUse(value: string): Promise<boolean> {
    return await this.repository.exists({ where: { email: value } })
  }

  async getAll(): Promise<User[]> {
    const allUsersFromDb = await this.repository.find()
    return allUsersFromDb.map(_user => _user.mapToEntity())
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email })

    return user?.mapToEntity() || null
  }

  async update(user: User): Promise<void> {
    const userModel = UserModel.fromEntity(user)
    await this.repository.update({ userId: user.Id }, userModel)
  }
}
