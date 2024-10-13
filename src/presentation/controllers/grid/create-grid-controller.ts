import { DbCreateGridUseCase } from '../../../core/usecases/grid/db-create-grid-use-case'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateGridController implements Controller {
  constructor(private readonly createGrid: DbCreateGridUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { rows, columns } = httpRequest.body
      if (!rows) {
        return badRequest(new Error('Missing rows'))
      }
      if (!columns) {
        return badRequest(new Error('Missing columns'))
      }
      const gridId = await this.createGrid.execute({
        size: { rows, columns },
      })

      return ok({ gridId })
    } catch (error) {
      return serverError(error)
    }
  }
}
