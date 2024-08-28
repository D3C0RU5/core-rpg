import { DbCreateCellUseCase } from '../../../usecases/cell/db-create-cell-use-case'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateCellController implements Controller {
  constructor(private readonly createCell: DbCreateCellUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { gridId, position, walkable } = httpRequest.body

      if (!gridId) {
        return badRequest(new Error('Missing gridId'))
      }

      if (!position) {
        return badRequest(new Error('Missing position'))
      }

      if (isNaN(Number(position.row))) {
        return badRequest(new Error('Missing position row'))
      }

      if (isNaN(Number(position.column))) {
        return badRequest(new Error('Missing position column'))
      }

      const gridSnapshot = await this.createCell.execute({
        gridId,
        position,
        walkable: walkable || false,
      })

      return ok({ gridSnapshot })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
