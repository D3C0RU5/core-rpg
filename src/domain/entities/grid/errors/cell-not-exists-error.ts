export class CellNotExistsError extends Error {
  constructor() {
    super(`The received cell not exists`)
    this.name = 'CellNotExistsError'
  }
}
