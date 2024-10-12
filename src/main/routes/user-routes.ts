import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpUserController } from '../factories/controllers/user/sign-up-user-controller'
import { makeSignInUserController } from '../factories/controllers/user/sign-in-user-controller'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeSignUpUserController()))
  router.post('/sign-in', adaptRoute(makeSignInUserController()))
}
