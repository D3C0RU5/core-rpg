import { Grid } from '../../../core/domain/entities/grid'
import { IGridRepositoryCreate } from '../../../core/usecases/protocols/grid/grid-repository-create'
import { IGridRepositoryExists } from '../../../core/usecases/protocols/grid/grid-repository-exists'
import { IDatabasePostgresConnection } from './protocols/database-connection'

export class GridRepositoryPostgres
  implements IGridRepositoryCreate, IGridRepositoryExists
{
  constructor(readonly connection: IDatabasePostgresConnection) {}

  async exists(gridId: string): Promise<boolean> {
    const result = await this.connection.query(
      'SELECT EXISTS (SELECT 1 FROM grids WHERE grid_id = $1) AS record_exists;',
      [gridId],
    )

    return result[0]?.record_exists
  }

  async create(grid: Grid): Promise<void> {
    await this.connection.query(
      'insert into grids (grid_id, rows, columns) values ($1, $2, $3)',
      [grid.Id, grid.Size.Rows, grid.Size.Columns],
    )
  }
}
