import { Grid } from '../../../domain/entities/grid'

export interface IGridRepositoryCreate {
  createGrid(grid: Grid): Promise<void>
}
