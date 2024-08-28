import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateGridController } from '../factories/controllers/grid/create-grid-controller'

export default (router: Router): void => {
  router.post('/grid', adaptRoute(makeCreateGridController()))
}
