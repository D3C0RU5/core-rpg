import { BaseError } from '../../../utils/errors/base-error'

export class MissingPropertyError extends BaseError {
  constructor(context: 'query' | 'body', name: string) {
    super(
      'MissingProperyError',
      'MISSING-PROPERTY',
      `A property ${name} is missing in ${context}`,
      {},
    )
    Object.setPrototypeOf(this, MissingPropertyError.prototype)
  }
}
