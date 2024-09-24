import { InvalidValueError } from '../../../../utils/errors/invalid-value-error'

export const emailAlreadyInUseError = (email: string) => {
  return new InvalidValueError(
    'EMAIL.EMAIL_ALREADY_TAKEN',
    'Email already in use by another user.',
    email,
  )
}
