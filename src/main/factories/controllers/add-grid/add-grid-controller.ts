import { AddGridController } from '../../../../presentation/controllers/grid/add-grid-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAddGrid } from '../../usecases/add-grid/db-create-grid-factory'

export const makeAddGridController = (): Controller => {
  const controller = new AddGridController(makeDbAddGrid())

  return controller
}
