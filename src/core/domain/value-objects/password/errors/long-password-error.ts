import { InvalidValueError } from '../../../../../utils/errors/invalid-value-error'

export const longPasswordError = (password: string) => {
  return new InvalidValueError(
    'PASSWORD.TOO_LONG_PASSWORD',
    'Too long password',
    password,
  )
}
