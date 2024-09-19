import { BaseError } from './base-error'

export class NotFoundError extends BaseError {
  constructor(key: string, message: string, value: unknown) {
    super('NotFoundError', key, message, { value })
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}
