import { Cell, CellSnapshot } from '../cell'
import { Character } from '../character'
import { Position } from '../../value-objects/position'
import { CellNotExistsError } from './errors/cell-not-exists-error'
import { Size, SizeSnapshot } from '../../value-objects/size'

export class Grid {
  private size: Size

  constructor(
    private readonly gridId: string,
    private cells: Cell[][],
  ) {
    this.size = this.calculateSize(cells)
  }

  static create(size: Size): Grid {
    const gridId = crypto.randomUUID()
    const cells = Grid.initializeCells(size)

    return new Grid(gridId, cells)
  }

  private static initializeCells(size: Size): Cell[][] {
    const cells: Cell[][] = Array.from({ length: size.getRows() }, () =>
      Array.from({ length: size.getColumns() }, () => Cell.create()),
    )
    return cells
  }

  private calculateSize(cells: Cell[][]): Size {
    return new Size(cells[0].length, cells.length)
  }

  getId(): string {
    return this.gridId
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
    for (let row = 1; row <= this.getSize().getRows(); row++) {
      for (let column = 1; column <= this.getSize().getColumns(); column++) {
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

  toSnapshot() {
    return {
      gridId: this.getId(),
      size: this.getSize().toSnapshot(),
      cells: this.cells.map(row => row.map(cell => cell.toSnapshot())),
    }
  }
}

export type GridSnapshot = {
  gridId: string
  size: SizeSnapshot
  cells: CellSnapshot[][]
}
