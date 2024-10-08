import { DbCreateCellUseCase } from '../../../../core/usecases/cell/db-create-cell-use-case'
import { GridRepository } from '../../../../infra/database/typeorm/grid-repository'
import { CellRepository } from '../../../../infra/database/typeorm/cell-repository'

export const makeDbAddCell = (): DbCreateCellUseCase => {
  const gridRepository = new GridRepository()
  const cellRepository = new CellRepository()

  return new DbCreateCellUseCase(gridRepository, cellRepository)
}
