import { Character } from '../character'
import { Position } from '../../value-objects/position'

export type CellProps = {
  cellId: string
  gridId: string
  position: Position
  walkable: boolean
  character?: Character
}

export class Cell {
  private readonly cellId: string
  private readonly gridId: string
  private readonly position: Position
  private readonly walkable: boolean
  private character: Character | null

  constructor(props: CellProps) {
    this.cellId = props.cellId
    this.gridId = props.gridId
    this.position = props.position
    this.walkable = props.walkable
    this.character = props.character || null
  }

  static create(gridId: string, position: Position, walkable: boolean): Cell {
    const cellId = crypto.randomUUID()
    return new Cell({ cellId, gridId, position, walkable })
  }

  occupied(): boolean {
    return !!this.character
  }

  isWalkable(): boolean {
    return this.walkable && !this.occupied()
  }

  addCharacter(character: Character) {
    if (this.isWalkable()) {
      this.character = character
    }
  }

  removeCharacter(): void {
    if (this.character) {
      this.character = null
    }
  }

  get Id() {
    return this.cellId
  }

  get GridId() {
    return this.gridId
  }

  get Position() {
    return this.position
  }

  get Walkable(): boolean {
    return this.walkable
  }

  get Character(): Character | null {
    return this.character
  }
}
