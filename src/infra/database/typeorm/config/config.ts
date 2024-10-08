import { DataSourceOptions } from 'typeorm'
import { UserModel } from '../models/user'

const entities = [UserModel]

export const SqliteConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'test-sqlite',
  entities,
  synchronize: true,
  logging: false,
}

export const PostgreSqlConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_ADDRESS,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities,
  subscribers: [],
  migrations: [],
}
