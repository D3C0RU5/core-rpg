import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { User } from '../../../../core/domain/entities/user/user'

@Entity({ name: 'users' })
export class UserModel extends BaseEntity {
  @PrimaryColumn()
  userId!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  hashedPassword!: string

  @Column({ nullable: true })
  token?: string

  mapToEntity() {
    return new User({
      userId: this.userId,
      name: this.name,
      email: this.email,
      hashedPassword: this.hashedPassword,
      token: this.token,
    })
  }

  static fromEntity(user: User): UserModel {
    const userModel = new UserModel()
    userModel.userId = user.Id
    userModel.name = user.Name
    userModel.email = user.Email
    userModel.hashedPassword = user.HashedPassword
    userModel.token = user.Token

    return userModel
  }
}
