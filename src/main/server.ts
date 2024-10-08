import { initializeDatabase } from '../infra/database/typeorm/config/datasource'
import app from './config/app'
import env from './config/env'

initializeDatabase(async () => {
  app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`)
  })
})
