import { ServerError } from '../../presentation/errors/server-error'
import { BaseError } from '../errors/base-error'

export const createGenericError = () => {
  return new ServerError()
}
export const createBaseError = () => {
  return new BaseError('FakeError', 'FAKE-ERROR', 'fake massage', {})
}
