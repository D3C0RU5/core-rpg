import { ISignInUseCase } from '../../../core/domain/usecases/sign-in-user'
import { handleError, ok } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingPropertyError } from '../errors/missing-property-error'

export class SignInController implements Controller {
  constructor(private readonly signInUseCase: ISignInUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) throw new MissingPropertyError('body', 'email')
      if (!password) throw new MissingPropertyError('body', 'password')

      const token = await this.signInUseCase.execute({ email, password })

      return ok({ token })
    } catch (error) {
      return handleError(error)
    }
  }
}
