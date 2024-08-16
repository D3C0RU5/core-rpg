export class Size {
  constructor(
    private readonly rows: number,
    private readonly columns: number,
  ) {}

  static create(rows: number, columns: number) {
    if (rows < 0) throw Error('InvalidRowValue')
    if (columns < 0) throw Error('InvalidColumnValue')
    return new Size(rows, columns)
  }

  getRows(): number {
    return this.rows
  }

  getColumns(): number {
    return this.columns
  }

  toSnapshot(): SizeSnapshot {
    return {
      rows: this.rows,
      colums: this.columns,
    }
  }
}

export type SizeSnapshot = {
  rows: number
  colums: number
}
