import { DataSource } from 'typeorm'
import { PostgreSqlConfig, SqliteConfig } from './config'

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test' ? SqliteConfig : PostgreSqlConfig,
)

export const initializeDatabase = (callback: () => void) => {
  AppDataSource.initialize()
    .then(() => callback())
    .catch(error => console.log(error))
}
