import { Grid } from '../../../../domain/entities/grid'
import { IGridRepository } from '../../../../usecases/repository/grid-repository'
import { DatabaseConnection } from '../DatabaseConnection'

export class GridRepository implements IGridRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async createGrid(grid: Grid): Promise<void> {
    await this.connection.query(
      'insert into grid (grid_id, rows, columns) values ($1, $2, $3)',
      [grid.getId(), grid.getSize().getRows(), grid.getSize().getColumns()],
    )
  }
}
