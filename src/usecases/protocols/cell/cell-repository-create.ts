import { Cell } from '../../../domain/entities/cell'

export interface ICellRepositoryCreate {
  create(grid: Cell): Promise<void>
}
