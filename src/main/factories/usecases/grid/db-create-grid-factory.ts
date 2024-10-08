import { DbCreateGridUseCase } from '../../../../core/usecases/grid/db-create-grid-use-case'
import { GridRepository } from '../../../../infra/database/typeorm/grid-repository'

export const makeDbCreateGrid = (): DbCreateGridUseCase => {
  const gridRepository = new GridRepository()

  return new DbCreateGridUseCase(gridRepository)
}
