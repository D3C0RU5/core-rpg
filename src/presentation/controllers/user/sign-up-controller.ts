import { ICreateUserUseCase } from '../../../core/domain/usecases/db-create-user'
import { handleError, ok } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { InvalidPropertyError } from '../errors/invalid-property-error'
import { MissingPropertyError } from '../errors/missing-property-error'

export class SignUpController implements Controller {
  constructor(private readonly createUser: ICreateUserUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (!name) throw new MissingPropertyError('body', 'name')
      if (!email) throw new MissingPropertyError('body', 'email')
      if (!password) throw new MissingPropertyError('body', 'password')
      if (!passwordConfirmation)
        throw new MissingPropertyError('body', 'passwordConfirmation')
      if (password != passwordConfirmation)
        throw new InvalidPropertyError('password', {
          message: 'Password not matches with confirmation',
        })
      await this.createUser.execute({ name, email, password })

      return ok()
    } catch (error) {
      return handleError(error)
    }
  }
}
