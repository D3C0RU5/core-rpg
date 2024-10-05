/* eslint-disable @typescript-eslint/no-explicit-any */
import pgp from 'pg-promise'
import { IDatabasePostgresConnection } from '../protocols/database-connection'

let instance: PgPromiseAdapter

export class PgPromiseAdapter implements IDatabasePostgresConnection {
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
