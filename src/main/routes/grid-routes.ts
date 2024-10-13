import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateGridController } from '../factories/controllers/grid/create-grid-controller'
import { authentication } from '../middlewares/authentication'

export default (router: Router): void => {
  router.post('/grid', authentication, adaptRoute(makeCreateGridController()))
}
