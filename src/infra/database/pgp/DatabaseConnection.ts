/* eslint-disable @typescript-eslint/no-explicit-any */
import pgp from 'pg-promise'

export interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>
  close(): Promise<void>
}

let instance: PgPromiseAdapter

export class PgPromiseAdapter implements DatabaseConnection {
  connection: any

  private constructor() {
    this.connection = pgp()(
      'postgres://postgres:password@localhost:5432/rpg_core',
    )
  }

  static getInstanceConnection() {
    if (!instance) {
      instance = new PgPromiseAdapter()
    }

    return instance
  }

  query(statement: string, params: any) {
    return this.connection.query(statement, params)
  }

  close() {
    return this.connection.$pool.end()
  }
}
