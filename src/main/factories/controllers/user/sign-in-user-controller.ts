import { SignInController } from '../../../../presentation/controllers/user/sign-in-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeSignInUseCase } from '../../usecases/user/sign-in-factory'

export const makeSignInUserController = (): Controller => {
  const controller = new SignInController(makeSignInUseCase())

  return controller
}
