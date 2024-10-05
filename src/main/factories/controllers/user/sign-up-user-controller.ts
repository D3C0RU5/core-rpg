import { SignUpController } from '../../../../presentation/controllers/user/sign-up-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbCreateUser } from '../../usecases/user/create-user-factory'

export const makeSignUpUserController = (): Controller => {
  const controller = new SignUpController(makeDbCreateUser())

  return controller
}
