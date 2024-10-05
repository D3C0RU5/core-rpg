import { Cell } from '../../../core/domain/entities/cell'
import { ICellRepositoryAlreadyExistsInPosition } from '../../../core/usecases/protocols/cell/cell-repository-already-exists-in-position'
import { ICellRepositoryCreate } from '../../../core/usecases/protocols/cell/cell-repository-create'
import { DatabaseConnection } from './DatabaseConnection'

export class CellRepositoryPostgres
  implements ICellRepositoryCreate, ICellRepositoryAlreadyExistsInPosition
{
  constructor(readonly connection: DatabaseConnection) {}

  async create(cell: Cell): Promise<void> {
    await this.connection.query(
      'insert into cells (cell_id, grid_id, row_index, column_index, walkable) values ($1, $2, $3, $4, $5)',
      [
        cell.Id,
        cell.GridId,
        cell.Position.Row,
        cell.Position.Column,
        cell.Walkable,
      ],
    )
  }

  async alreadyExistsInPosition(cell: Cell): Promise<boolean> {
    const result = await this.connection.query(
      'SELECT EXISTS (SELECT 1 FROM cells WHERE grid_id = $1 AND row_index = $2 AND column_index = $3) AS record_exists;',
      [cell.GridId, cell.Position.Row, cell.Position.Column],
    )

    return result[0]?.record_exists
  }
}
