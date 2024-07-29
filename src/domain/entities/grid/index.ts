import { Cell } from '../cell'
import { Character } from '../character'
import { Position } from '../vo/position'
import { CellNotExistsError } from './errors/cell-not-exists-error'

type Size = {
  rows: number
  columns: number
}

export class Grid {
  private size: Size

  constructor(private cells: Cell[][]) {
    this.size = this.calculateSize(cells)
  }

  static create(size: Size): Grid {
    const cells = Grid.initializeCells(size)

    return new Grid(cells)
  }

  private static initializeCells(size: Size): Cell[][] {
    const cells: Cell[][] = Array.from({ length: size.rows }, () =>
      Array.from({ length: size.columns }, () => Cell.create()),
    )
    return cells
  }

  private calculateSize(cells: Cell[][]): Size {
    return { columns: cells[0].length, rows: cells.length }
  }

  getSize(): Size {
    return this.size
  }

  getCell(data: Position): Cell {
    const row = data.getRowAsIndex()
    const column = data.getColumnAsIndex()
    if (this.cells[row] == undefined || this.cells[row][column] == undefined) {
      throw new CellNotExistsError()
    }
    return this.cells[row][column]
  }

  getCharacterCell(character: Character): Cell | null {
    for (let row = 1; row <= this.getSize().rows; row++) {
      for (let column = 1; column <= this.getSize().columns; column++) {
        const cell = this.getCell(new Position(row, column))
        if (cell.hasCharacter(character)) return cell
      }
    }
    return null
  }

  moveCharacter(character: Character, toPosition: Position) {
    const fromCell = this.getCharacterCell(character)
    if (!fromCell) {
      throw new Error('Character is not in grid')
    }
    const toCell = this.getCell(toPosition)

    if (toCell.isCellWalkable()) {
      fromCell.removeOccupant(character)
      toCell.addCharacter(character)
    }
  }
}
