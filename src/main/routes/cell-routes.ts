import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateCellController } from '../factories/controllers/cell/create-cell-controller'

export default (router: Router): void => {
  router.post('/cell', adaptRoute(makeCreateCellController()))
}
