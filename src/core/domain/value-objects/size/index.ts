import { columnsLessThanZeroError, rowsLessThanZeroError } from './errors'

export type SizeProps = {
  rows: number
  columns: number
}

export class Size {
  private readonly rows: number
  private readonly columns: number

  constructor(props: SizeProps) {
    this.rows = props.rows
    this.columns = props.columns
  }

  static create(rows: number, columns: number) {
    if (rows < 0) throw rowsLessThanZeroError(rows)
    if (columns < 0) throw columnsLessThanZeroError(columns)
    return new Size({ rows, columns })
  }

  get Rows(): number {
    return this.rows
  }

  get Columns(): number {
    return this.columns
  }
}
