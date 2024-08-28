import { CreateGridController } from '../../../../presentation/controllers/grid/create-grid-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbCreateGrid } from '../../usecases/grid/db-create-grid-factory'

export const makeCreateGridController = (): Controller => {
  const controller = new CreateGridController(makeDbCreateGrid())

  return controller
}
