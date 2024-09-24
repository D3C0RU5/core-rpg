import { Email } from '../../value-objects/email'

export type UserProps = {
  userId: string
  name: string
  email: Email
  password: string
  token?: string
}

export class User {
  private userId: string
  private name: string
  private email: Email
  private password: string
  private token?: string

  constructor(props: UserProps) {
    this.userId = props.userId
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.token = props.token
  }

  static create(name: string, email: Email, password: string): User {
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

  get Password(): string {
    return this.password
  }

  get Token(): string | undefined {
    return this.token
  }
}
