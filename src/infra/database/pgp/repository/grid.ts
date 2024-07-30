import { Grid } from '../../../../domain/entities/grid'
import { IGridRepository } from '../../../../usecases/repository/grid-repository'
import { DatabaseConnection } from '../DatabaseConnection'

export class GridRepository implements IGridRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async createGrid(grid: Grid): Promise<void> {
    await this.connection.query(
      'insert into rpg_core.grid (grid_id, rows, columns)',
      [grid.getId(), grid.getSize().getRows(), grid.getSize().getColumns()],
    )
  }
}
