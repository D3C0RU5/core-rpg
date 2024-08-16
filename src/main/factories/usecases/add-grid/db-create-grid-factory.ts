import { DbAddGrid } from '../../../../usecases/grid/db-add-grid'
import { GridRepository } from '../../../../infra/database/pgp/repository/grid-repository'
import { PgPromiseAdapter } from '../../../../infra/database/pgp/DatabaseConnection'
export const makeDbAddGrid = (): DbAddGrid => {
  const gridRepository = new GridRepository(new PgPromiseAdapter())

  return new DbAddGrid(gridRepository)
}
