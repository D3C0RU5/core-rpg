import { NotFoundError } from '../../../../utils/errors/not-found-error'

export const userNotFound = () => {
  return new NotFoundError(
    'USER.USER_NOT_FOUND',
    'User not found in the database',
    null,
  )
}
