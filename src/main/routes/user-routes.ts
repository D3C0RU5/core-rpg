import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpUserController } from '../factories/controllers/user/sign-up-user-controller'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeSignUpUserController()))
}
