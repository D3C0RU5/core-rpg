export class Size {
  constructor(
    private readonly rows: number,
    private readonly columns: number,
  ) {}

  static create(row: number, column: number) {
    return new Size(row, column)
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
