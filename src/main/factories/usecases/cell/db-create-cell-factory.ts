import { GridRepository } from '../../../../infra/database/pgp/repository/grid-repository'
import { PgPromiseAdapter } from '../../../../infra/database/pgp/DatabaseConnection'
import { DbCreateCellUseCase } from '../../../../usecases/cell/db-create-cell-use-case'
import { CellRepository } from '../../../../infra/database/pgp/repository/cell-repository.ts'

export const makeDbAddCell = (): DbCreateCellUseCase => {
  const gridRepository = new GridRepository(
    PgPromiseAdapter.getInstanceConnection(),
  )
  const cellRepository = new CellRepository(
    PgPromiseAdapter.getInstanceConnection(),
  )

  return new DbCreateCellUseCase(gridRepository, cellRepository)
}
