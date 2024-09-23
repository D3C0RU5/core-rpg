import { columnLessThanZeroError, rowLessThanZeroError } from './errors'

export type PositionProps = {
  row: number
  column: number
}

export type PositionSnapshot = {
  row: number
  column: number
}

export class Position {
  private readonly row: number
  private readonly column: number

  constructor(props: PositionProps) {
    this.row = props.row
    this.column = props.column
  }

  static create(row: number, column: number) {
    if (row < 0) throw rowLessThanZeroError(row)
    if (column < 0) throw columnLessThanZeroError(column)
    return new Position({ row, column })
  }

  get Row(): number {
    return this.row
  }

  get Column(): number {
    return this.column
  }

  toSnapshot(): PositionSnapshot {
    return {
      row: this.row,
      column: this.column,
    }
  }
}
