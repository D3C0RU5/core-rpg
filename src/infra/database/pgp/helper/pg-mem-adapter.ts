/* eslint-disable @typescript-eslint/no-explicit-any */
import { newDb } from 'pg-mem'
import { IDatabasePostgresConnection } from '../protocols/database-connection'

let instance: PgMemoryAdapter

export class PgMemoryAdapter implements IDatabasePostgresConnection {
  connection: any

  private constructor() {
    this.connection = newDb()
  }

  static getInstanceConnection() {
    if (!instance) {
      instance = new PgMemoryAdapter()
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
