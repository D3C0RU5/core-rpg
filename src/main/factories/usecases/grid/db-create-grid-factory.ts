import { DbCreateGridUseCase } from '../../../../core/usecases/grid/db-create-grid-use-case'
import { GridRepositoryPostgres } from '../../../../infra/database/pgp/grid-repository'
import { PgPromiseAdapter } from '../../../../infra/database/pgp/DatabaseConnection'

export const makeDbCreateGrid = (): DbCreateGridUseCase => {
  const gridRepository = new GridRepositoryPostgres(
    PgPromiseAdapter.getInstanceConnection(),
  )

  return new DbCreateGridUseCase(gridRepository)
}
