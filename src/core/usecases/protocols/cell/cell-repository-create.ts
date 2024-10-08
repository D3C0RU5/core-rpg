import { Cell } from '../../../domain/entities/cell'

export interface ICellRepositoryCreate {
  create(cell: Cell): Promise<void>
}
