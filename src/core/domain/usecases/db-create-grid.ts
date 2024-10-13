import { UseCase } from './usecase'

export type InputCreateGrid = {
  size: {
    rows: number
    columns: number
  }
}
export abstract class ICreateGridUseCase implements UseCase {
  abstract execute(input: InputCreateGrid): Promise<string>
}
