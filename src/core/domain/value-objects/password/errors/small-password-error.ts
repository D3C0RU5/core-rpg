import { InvalidValueError } from '../../../../../utils/errors/invalid-value-error'

export const smallPasswordError = (password: string) => {
  return new InvalidValueError(
    'PASSWORD.TOO_SMALL_PASSWORD',
    'Too small password',
    password,
  )
}
