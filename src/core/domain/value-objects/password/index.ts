import { longPasswordError } from './errors/long-password-error'
import { missingRequirementsPasswordError } from './errors/missing-requirements-password-error'
import { smallPasswordError } from './errors/small-password-error'

export const SPECIAL_CHARACTERS = '!@#$%^&*(),.?":{}|<>_'

export class Password {
  constructor(private readonly password: string) {}

  public static create(password: string) {
    const isValid = Password.validate(password)

    return new Password(password)
  }

  public static validate(password: string): boolean {
    if (password.length < 8) {
      throw smallPasswordError(password)
    }
    if (password.length > 16) {
      throw longPasswordError(password)
    }
    if (!/\d/.test(password)) {
      throw missingRequirementsPasswordError(password)
    }
    if (!/[SPECIAL_CHARACTERS]/.test(password)) {
      throw missingRequirementsPasswordError(password)
    }

    return true
  }
}
