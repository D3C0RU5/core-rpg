import { Email } from '../../value-objects/email'
import { UUID } from '../../value-objects/UUID'

export type UserProps = {
  userId: string
  name: string
  email: string
  hashedPassword: string
  token?: string
}

export class User {
  private userId: UUID
  private name: string
  private email: Email
  private hashedPassword: string
  private token?: string

  constructor({ userId, name, email, hashedPassword, token }: UserProps) {
    this.userId = new UUID(userId)
    this.name = name
    this.email = new Email(email)
    this.hashedPassword = hashedPassword
    this.token = token
  }

  static create(name: string, email: string, hashedPassword: string): User {
    const userId = crypto.randomUUID()

    return new User({ userId, name, email, hashedPassword })
  }

  get Id(): string {
    return this.userId.Value
  }

  get Name(): string {
    return this.name
  }

  get Email(): string {
    return this.email.Value
  }

  get HashedPassword(): string {
    return this.hashedPassword
  }

  get Token(): string | undefined {
    return this.token
  }
}
