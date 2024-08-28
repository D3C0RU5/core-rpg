import { Cell, CellSnapshot } from '../../domain/entities/cell'
import { Position } from '../../domain/value-objects/position'
import { ICellRepositoryCreate } from '../protocols/cell/cell-repository-create'
import { IGridRepositoryExists } from '../protocols/grid/grid-repository-exists'
import { UseCase } from '../usecase'

type Input = {
  gridId: string
  position: {
    row: number
    column: number
  }
  walkable: boolean
}

export class DbAddCell implements UseCase {
  constructor(
    private readonly gridRepository: IGridRepositoryExists,
    private readonly cellRepository: ICellRepositoryCreate,
  ) {}

  async execute({ gridId, position, walkable }: Input): Promise<CellSnapshot> {
    const gridExists = await this.gridRepository.exists(gridId)

    if (!gridExists) {
      throw new Error('Grid is missing')
    }

    const cell = Cell.create(
      gridId,
      Position.create(position.row, position.column),
      walkable,
    )
    console.log(cell.toSnapshot())
    await this.cellRepository.create(cell)
    console.log('passou aqui')

    return cell.toSnapshot()
  }
}
