import { BaseError } from '../../../utils/errors/base-error'

export class MissingProperyError extends BaseError {
  constructor(context: 'query' | 'body', name: string) {
    super(
      'MissingProperyError',
      'MISSING-PROPERTY',
      `A property ${name} is missing in ${context}`,
      {},
    )
    Object.setPrototypeOf(this, MissingProperyError.prototype)
  }
}
