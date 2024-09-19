import { Grid } from '../../../domain/entities/grid'

export interface IGridRepositoryCreate {
  create(grid: Grid): Promise<void>
}
