import { ICreateGridUseCase } from '../../../core/domain/usecases/db-create-grid'
import { handleError, ok } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingPropertyError } from '../errors/missing-property-error'

export class CreateGridController implements Controller {
  constructor(private readonly createGrid: ICreateGridUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { rows, columns } = httpRequest.body
      if (!rows) {
        throw new MissingPropertyError('body', 'rows')
      }
      if (!columns) {
        throw new MissingPropertyError('body', 'columns')
      }
      const gridId = await this.createGrid.execute({
        size: { rows, columns },
      })

      return ok({ gridId })
    } catch (error) {
      return handleError(error)
    }
  }
}
