export class Position {
  constructor(
    private readonly row: number,
    private readonly column: number,
  ) {}

  static create(row: number, column: number) {
    if (row < 0) throw Error('InvalidRowValue')
    if (column < 0) throw Error('InvalidColumnValue')
    return new Position(row, column)
  }

  getRowAsIndex(): number {
    return this.row - 1
  }

  getColumnAsIndex(): number {
    return this.column - 1
  }
}
