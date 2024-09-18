import { Cell, CellSnapshot } from '../../../domain/entities/cell'
import {
  ICreateCellUseCase,
  InputCreateCell,
} from '../../../domain/usecases/db-create-cell'
import { Position } from '../../../domain/value-objects/position'
import { ICellRepositoryCreate } from '../../protocols/cell/cell-repository-create'
import { IGridRepositoryExists } from '../../protocols/grid/grid-repository-exists'
import { gridNotFoundError } from './errors/grid-not-found-error'

export class DbCreateCellUseCase implements ICreateCellUseCase {
  constructor(
    private readonly gridRepository: IGridRepositoryExists,
    private readonly cellRepository: ICellRepositoryCreate,
  ) {}

  async execute(input: InputCreateCell): Promise<CellSnapshot> {
    const { gridId, position, walkable } = input

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
