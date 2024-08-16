import { Express, Router } from 'express'
// import { readdirSync } from 'fs'
import gridRoutes from '../routes/grid-routes'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  gridRoutes(router)
}
