import { CreateCellController } from '../../../../presentation/controllers/cell/create-cell-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAddCell } from '../../usecases/cell/db-create-cell-factory'

export const makeAddGridController = (): Controller => {
  const controller = new CreateCellController(makeDbAddCell())

  return controller
}
