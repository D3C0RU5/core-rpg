import { InvalidValueError } from '../../../../utils/errors/invalid-value-error'

export const authenticationError = () => {
  return new InvalidValueError(
    'USER.AUTHENTICATION_FAILURE',
    'Failure on authenticate with credentials',
    {},
  )
}
