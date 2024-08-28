import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddGridController } from '../factories/controllers/grid/add-grid-controller'

export default (router: Router): void => {
  router.post('/grid', adaptRoute(makeAddGridController()))
}
