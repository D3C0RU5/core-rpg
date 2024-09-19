import { ICreateCellUseCase } from '../../../core/domain/usecases/db-create-cell'
import { handleError, ok } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingPropertyError } from '../errors/missing-property-error'

export class CreateCellController implements Controller {
  constructor(private readonly createCell: ICreateCellUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { gridId, position, walkable } = httpRequest.body

      if (!gridId) {
        throw new MissingPropertyError('body', 'gridId')
      }

      if (!position) {
        throw new MissingPropertyError('body', 'position')
      }

      if (isNaN(Number(position.row))) {
        throw new MissingPropertyError('body', 'position.row')
      }

      if (isNaN(Number(position.column))) {
        throw new MissingPropertyError('body', 'position.column')
      }

      const cellSnapshot = await this.createCell.execute({
        gridId,
        position,
        walkable: walkable || false,
      })

      return ok(cellSnapshot)
    } catch (error) {
      return handleError(error)
    }
  }
}
