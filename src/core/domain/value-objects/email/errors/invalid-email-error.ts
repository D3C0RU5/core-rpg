import { InvalidValueError } from '../../../../../utils/errors/invalid-value-error'

export const invalidEmailError = (email: string) => {
  return new InvalidValueError(
    'EMAIL.INVALID_EMAIL',
    'Invalid value for email.',
    email,
  )
}
