import { GridRepositoryPostgres } from '../../../../infra/database/pgp/repository/grid-repository'
import { PgPromiseAdapter } from '../../../../infra/database/pgp/DatabaseConnection'
import { DbCreateCellUseCase } from '../../../../usecases/cell/db-create-cell-use-case'
import { CellRepositoryPostgres } from '../../../../infra/database/pgp/repository/cell-repository'

export const makeDbAddCell = (): DbCreateCellUseCase => {
  const connection = PgPromiseAdapter.getInstanceConnection()
  const gridRepository = new GridRepositoryPostgres(connection)
  const cellRepository = new CellRepositoryPostgres(connection)

  return new DbCreateCellUseCase(gridRepository, cellRepository)
}
