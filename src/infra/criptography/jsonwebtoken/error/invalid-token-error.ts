import { BaseError } from '../../../../utils/errors/base-error'

export const invalidTokenError = (error: unknown) => {
  return new BaseError(
    'InvalidTokenError',
    'TOKEN.INVALID_TOKEN',
    'something goes wrong when verifing token',
    error,
  )
}
