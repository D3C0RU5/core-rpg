import { Grid, GridSnapshot } from '../../domain/entities/grid'
import { Size } from '../../domain/value-objects/size'
import { IGridRepository } from '../repository/grid-repository'
import { UseCase } from '../usecase'

type Input = {
  size: {
    rows: number
    columns: number
  }
}

export class CreateGrid implements UseCase {
  constructor(private readonly gridRepository: IGridRepository) {}

  async execute(input: Input): Promise<GridSnapshot> {
    const { rows, columns } = input.size
    const size = Size.create(rows, columns)
    const grid = Grid.create(size)

    await this.gridRepository.createGrid(grid)

    return grid.toSnapshot()
  }
}
