import { invalidEmailError } from './errors/invalid-email-error'

export class Email {
  constructor(private readonly email: string) {
    const isEmailValid = Email.validateEmail(email)
    if (!isEmailValid) {
      throw invalidEmailError(email)
    }
  }

  private static validateEmail(email: string): boolean {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
  }

  get Value(): string {
    return this.email
  }
}
