import { Grid } from '../../../../domain/entities/grid'
import { IGridRepositoryCreate } from '../../../../usecases/protocols/grid/grid-repository-create'
import { IGridRepositoryExists } from '../../../../usecases/protocols/grid/grid-repository-exists'
import { DatabaseConnection } from '../DatabaseConnection'

export class GridRepository
  implements IGridRepositoryCreate, IGridRepositoryExists
{
  constructor(readonly connection: DatabaseConnection) {}

  async exists(gridId: string): Promise<boolean> {
    const result = await this.connection.query(
      "SELECT EXISTS (SELECT 1 FROM grid WHERE grid_id = '5801ba27-3445-45eb-b57d-6b2d3428f5c2') AS record_exists;",
      [gridId],
    )

    return result[0]?.record_exists
  }

  async create(grid: Grid): Promise<void> {
    await this.connection.query(
      'insert into grid (grid_id, rows, columns) values ($1, $2, $3)',
      [grid.getId(), grid.getSize().getRows(), grid.getSize().getColumns()],
    )
  }
}
