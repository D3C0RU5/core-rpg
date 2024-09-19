import { Grid, GridSnapshot } from '../../domain/entities/grid'
import { Size } from '../../domain/value-objects/size'
import { IGridRepositoryCreate } from '../protocols/grid/grid-repository-create'
import { UseCase } from '../../domain/usecases/usecase'

export type Input = {
  size: {
    rows: number
    columns: number
  }
}

export class DbCreateGridUseCase implements UseCase {
  constructor(private readonly gridRepository: IGridRepositoryCreate) {}

  async execute(input: Input): Promise<GridSnapshot> {
    const { rows, columns } = input.size
    const size = Size.create(rows, columns)
    const grid = Grid.create(size)

    await this.gridRepository.create(grid)

    return grid.toSnapshot()
  }
}
