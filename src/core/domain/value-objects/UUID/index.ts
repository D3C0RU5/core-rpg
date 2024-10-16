import crypto from 'crypto'

export class UUID {
  private readonly value: string

  constructor(value: string) {
    this.value = value
  }

  static create() {
    const uuid = crypto.randomUUID()
    return new UUID(uuid)
  }

  get Value() {
    return this.value
  }
}
