import { Cell } from '../../../domain/entities/cell'

export interface ICellRepositoryAlreadyExistsInPosition {
  alreadyExistsInPosition(cell: Cell): Promise<boolean>
}
