import { BaseError } from '../../../utils/errors/base-error'

export class InvalidPropertyError extends BaseError {
  constructor(name: string, details?: unknown) {
    super(
      'InvalidPropertyError',
      'INVALID-PROPERTY',
      `Invalid value for property ${name}`,
      { name, details },
    )
    Object.setPrototypeOf(this, InvalidPropertyError.prototype)
  }
}
