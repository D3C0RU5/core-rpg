import { DataSource } from 'typeorm'
import { PostgreSqlConfig, SqliteConfig } from './config'
import * as dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test' ? SqliteConfig : PostgreSqlConfig,
)

export const initializeDatabase = (callback: () => void) => {
  console.log(AppDataSource)
  AppDataSource.initialize()
    .then(() => callback())
    .catch(error => console.log(error))
}
