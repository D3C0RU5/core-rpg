import { Cell, CellSnapshot } from '../../../domain/entities/cell'
import { Position } from '../../../domain/value-objects/position'
import { ICellRepositoryCreate } from '../../protocols/cell/cell-repository-create'
import { IGridRepositoryExists } from '../../protocols/grid/grid-repository-exists'
import { UseCase } from '../../usecase'
import { gridNotFoundError } from './errors/grid-not-found-error'

export type Input = {
  gridId: string
  position: {
    row: number
    column: number
  }
  walkable: boolean
}

export class DbCreateCellUseCase implements UseCase {
  constructor(
    private readonly gridRepository: IGridRepositoryExists,
    private readonly cellRepository: ICellRepositoryCreate,
  ) {}

  async execute({ gridId, position, walkable }: Input): Promise<CellSnapshot> {
    const gridExists = await this.gridRepository.exists(gridId)

    if (!gridExists) {
      throw gridNotFoundError(gridId)
    }

    const cell = Cell.create(
      gridId,
      Position.create(position.row, position.column),
      walkable,
    )
    await this.cellRepository.create(cell)

    return cell.toSnapshot()
  }
}
