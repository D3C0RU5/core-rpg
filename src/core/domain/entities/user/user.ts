import { Email } from '../../value-objects/email'
import { Password } from '../../value-objects/password'

export type UserProps = {
  userId: string
  name: string
  email: Email
  password: Password
  token?: string
}

export class User {
  private userId: string
  private name: string
  private email: Email
  private password: Password
  private token?: string

  constructor(props: UserProps) {
    this.userId = props.userId
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.token = props.token
  }

  static create(name: string, email: Email, password: Password): User {
    const userId = crypto.randomUUID()

    return new User({ userId, email, name, password })
  }

  get Id(): string {
    return this.userId
  }

  get Name(): string {
    return this.name
  }

  get Email(): Email {
    return this.email
  }

  get Password(): Password {
    return this.password
  }

  get Token(): string | undefined {
    return this.token
  }
}
