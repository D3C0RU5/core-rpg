/* eslint-disable @typescript-eslint/no-explicit-any */
import pgp from 'pg-promise'

export interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>
  close(): Promise<void>
}

export class PgPromiseAdapter implements DatabaseConnection {
  connection: any

  constructor() {
    this.connection = pgp()(
      'postgres://postgres:password@localhost:5432/rpg_core',
    )
  }

  query(statement: string, params: any) {
    return this.connection.query(statement, params)
  }

  close() {
    return this.connection.$pool.end()
  }
}
