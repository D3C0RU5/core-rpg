import { DbAddGrid } from '../../../usecases/grid/db-add-grid'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddGridController implements Controller {
  constructor(private readonly addGrid: DbAddGrid) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { rows, columns } = httpRequest.body
      if (!rows) {
        return badRequest(new Error('Missing rows'))
      }
      if (!columns) {
        return badRequest(new Error('Missing columns'))
      }
      const gridSnapshot = await this.addGrid.execute({
        size: { rows, columns },
      })

      return ok({ gridSnapshot })
    } catch (error) {
      return serverError(error)
    }
  }
}
