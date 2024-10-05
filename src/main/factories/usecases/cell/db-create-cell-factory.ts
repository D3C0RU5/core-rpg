import { GridRepositoryPostgres } from '../../../../infra/database/pgp/grid-repository'
import { PgPromiseAdapter } from '../../../../infra/database/pgp/helper/pg-promise-adapter'
import { DbCreateCellUseCase } from '../../../../core/usecases/cell/db-create-cell-use-case'
import { CellRepositoryPostgres } from '../../../../infra/database/pgp/cell-repository'

export const makeDbAddCell = (): DbCreateCellUseCase => {
  const connection = PgPromiseAdapter.getInstanceConnection()
  const gridRepository = new GridRepositoryPostgres(connection)
  const cellRepository = new CellRepositoryPostgres(connection)

  return new DbCreateCellUseCase(gridRepository, cellRepository)
}
