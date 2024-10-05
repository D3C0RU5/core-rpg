/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IDatabasePostgresConnection {
  query(statement: string, params: any): Promise<any>
  close(): Promise<void>
}
