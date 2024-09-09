import { BaseError } from '../../utils/errors/base-error'

export class InvalidValueError extends BaseError {
  constructor(key: string, message: string, value: unknown) {
    super('InvalidValueError', key, message, { value })
    Object.setPrototypeOf(this, InvalidValueError.prototype)
  }
}
