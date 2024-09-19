import { Cell } from '../../../../domain/entities/cell'
import { ICellRepositoryCreate } from '../../../../usecases/protocols/cell/cell-repository-create'
import { DatabaseConnection } from '../DatabaseConnection'

export class CellRepository implements ICellRepositoryCreate {
  constructor(readonly connection: DatabaseConnection) {}

  async create(cell: Cell): Promise<void> {
    await this.connection.query(
      'insert into cell (cell_id, grid_id, row_index, column_index, walkable) values ($1, $2, $3, $4, $5)',
      [
        cell.getId(),
        cell.getGridId(),
        cell.getPosition().getRowAsIndex(),
        cell.getPosition().getColumnAsIndex(),
        cell.getWalkable(),
      ],
    )
  }
}
