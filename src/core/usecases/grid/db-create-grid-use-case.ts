import { Grid } from '../../domain/entities/grid'
import { Size } from '../../domain/value-objects/size'
import { IGridRepositoryCreate } from '../protocols/grid/grid-repository-create'
import {
  ICreateGridUseCase,
  InputCreateGrid,
} from '../../domain/usecases/db-create-grid'

export class DbCreateGridUseCase implements ICreateGridUseCase {
  constructor(private readonly gridRepository: IGridRepositoryCreate) {}

  async execute(input: InputCreateGrid): Promise<string> {
    const { rows, columns } = input.size
    const size = Size.create(rows, columns)
    const grid = Grid.create(size)

    await this.gridRepository.create(grid)

    return grid.Id
  }
}
