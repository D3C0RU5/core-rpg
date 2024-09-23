import { invalidEmailError } from './errors/invalid-email-error'

export class Email {
  constructor(private readonly email: string) {}

  static create(email: string): Email {
    const isEmailValid = Email.validateEmail(email)
    if (!isEmailValid) {
      throw invalidEmailError(email)
    }

    return new Email(email)
  }

  private static validateEmail(email: string): boolean {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
  }

  get Value(): string {
    return this.email
  }
}
