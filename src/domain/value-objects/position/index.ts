import { columnLessThanZeroError, rowLessThanZeroError } from './errors'

export class Position {
  constructor(
    private readonly row: number,
    private readonly column: number,
  ) {}

  static create(row: number, column: number) {
    if (row < 0) throw rowLessThanZeroError(row)
    if (column < 0) throw columnLessThanZeroError(column)
    return new Position(row, column)
  }

  getRowAsIndex(): number {
    return this.row - 1
  }

  getColumnAsIndex(): number {
    return this.column - 1
  }
}
