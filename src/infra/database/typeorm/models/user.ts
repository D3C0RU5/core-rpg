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
  token!: string

  mapToUser = () => {
    return new User({
      userId: this.userId,
      name: this.name,
      email: this.email,
      hashedPassword: this.hashedPassword,
      token: this.token,
    })
  }
}
