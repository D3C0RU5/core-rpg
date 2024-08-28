import { GridRepository } from '../../../../infra/database/pgp/repository/grid-repository'
import { PgPromiseAdapter } from '../../../../infra/database/pgp/DatabaseConnection'
import { DbAddCell } from '../../../../usecases/cell/db-add-cell'
import { CellRepository } from '../../../../infra/database/pgp/repository/cell-repository.ts'

export const makeDbAddCell = (): DbAddCell => {
  const gridRepository = new GridRepository(
    PgPromiseAdapter.getInstanceConnection(),
  )
  const cellRepository = new CellRepository(
    PgPromiseAdapter.getInstanceConnection(),
  )

  return new DbAddCell(gridRepository, cellRepository)
}
