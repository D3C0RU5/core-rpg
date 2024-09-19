import { Cell, CellSnapshot } from '../../../domain/entities/cell'
import {
  ICreateCellUseCase,
  InputCreateCell,
} from '../../../domain/usecases/db-create-cell'
import { Position } from '../../../domain/value-objects/position'
import { ICellRepositoryAlreadyExistsInPosition } from '../../protocols/cell/cell-repository-already-exists-in-position'
import { ICellRepositoryCreate } from '../../protocols/cell/cell-repository-create'
import { IGridRepositoryExists } from '../../protocols/grid/grid-repository-exists'
import { gridNotFoundError } from './errors/grid-not-found-error'
import { invalidGridInPositionError } from './errors/invalid-grid-in-position-error'

interface ICellRepositoryAggregate
  extends ICellRepositoryCreate,
    ICellRepositoryAlreadyExistsInPosition {}

export class DbCreateCellUseCase implements ICreateCellUseCase {
  constructor(
    private readonly gridRepository: IGridRepositoryExists,
    private readonly cellRepository: ICellRepositoryAggregate,
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
    const exists = await this.cellRepository.alreadyExistsInPosition(cell)
    if (!exists) {
      throw invalidGridInPositionError(cell.getPosition())
    }
    await this.cellRepository.create(cell)

    return cell.toSnapshot()
  }
}
