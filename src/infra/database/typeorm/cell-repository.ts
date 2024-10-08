import { ICellRepositoryCreate } from '../../../core/usecases/protocols/cell/cell-repository-create'
import { ICellRepositoryAlreadyExistsInPosition } from '../../../core/usecases/protocols/cell/cell-repository-already-exists-in-position'
import { CellModel } from './models/cell'
import { Repository } from 'typeorm'
import { AppDataSource } from './config/datasource'
import { Cell } from '../../../core/domain/entities/cell'

export class CellRepository
  implements ICellRepositoryCreate, ICellRepositoryAlreadyExistsInPosition
{
  private readonly repository: Repository<CellModel>

  constructor() {
    this.repository = AppDataSource.getRepository(CellModel)
  }

  async create(cell: Cell): Promise<void> {
    this.repository.insert({
      cellId: cell.Id,
      gridId: cell.GridId,
      row: cell.Position.Row,
      column: cell.Position.Column,
      walkable: cell.Walkable,
    })
  }

  async alreadyExistsInPosition(cell: Cell): Promise<boolean> {
    return await this.repository.exists({
      where: {
        gridId: cell.GridId,
        row: cell.Position.Row,
        column: cell.Position.Column,
      },
    })
  }
}
