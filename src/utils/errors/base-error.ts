/* eslint-disable @typescript-eslint/no-explicit-any */
export class BaseError extends Error {
  public readonly name: string
  public readonly key: string
  public readonly message: string
  public readonly details: any
  public readonly stack?: string

  constructor(name: string, key: string, message: string, details: any) {
    super(message)
    this.name = name
    this.key = key
    this.message = message
    this.details = details
    this.stack = new Error().stack

    Object.setPrototypeOf(this, BaseError.prototype)
  }
}
