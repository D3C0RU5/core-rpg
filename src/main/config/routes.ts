import { Express, Router } from 'express'
// import { readdirSync } from 'fs'
import gridRoutes from '../routes/grid-routes'
import cellRoutes from '../routes/cell-routes'
import userRoutes from '../routes/user-routes'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  gridRoutes(router)
  cellRoutes(router)
  userRoutes(router)
}
