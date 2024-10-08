import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { PostgreSqlConfig, SqliteConfig } from './config'

export const AppDataSource = new DataSource(
  process.env.ENVIRONMENT === 'test' ? SqliteConfig : PostgreSqlConfig,
)

export const initializeDatabase = (callback: () => void) => {
  AppDataSource.initialize()
    .then(() => callback())
    .catch(error => console.log(error))
}
