import { UseCase } from './usecase'
import { CellSnapshot } from '../entities/cell'

export type InputCreateCell = {
  gridId: string
  position: {
    row: number
    column: number
  }
  walkable: boolean
}

export abstract class ICreateCellUseCase implements UseCase {
  abstract execute(input: InputCreateCell): Promise<CellSnapshot>
}
