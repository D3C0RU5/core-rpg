import { IGridRepositoryExists } from '../../../core/usecases/protocols/grid/grid-repository-exists'
import { IGridRepositoryCreate } from '../../../core/usecases/protocols/grid/grid-repository-create'
import { GridModel } from './models/grid'
import { AppDataSource } from './config/datasource'
import { Repository } from 'typeorm'
import { Grid } from '../../../core/domain/entities/grid'

export class GridRepository
  implements IGridRepositoryExists, IGridRepositoryCreate
{
  private readonly repository: Repository<GridModel>

  constructor() {
    this.repository = AppDataSource.getRepository(GridModel)
  }

  async create(grid: Grid): Promise<void> {
    await this.repository.insert({
      gridId: grid.Id,
      rows: grid.Size.Rows,
      columns: grid.Size.Columns,
    })
  }

  async exists(gridId: string): Promise<boolean> {
    return await this.repository.exists({ where: { gridId: gridId } })
  }
}
