import { Character, CharacterSnapshot } from '../character'
import { Position } from '../../value-objects/position'

export type CellProps = {
  cellId: string
  gridId: string
  position: Position
  walkable: boolean
  character?: Character | null
}

export class Cell {
  private cellId: string
  private gridId: string
  private position: Position
  private walkable: boolean
  private character?: Character | null

  constructor(props: CellProps) {
    this.cellId = props.cellId
    this.gridId = props.gridId
    this.position = props.position
    this.walkable = props.walkable
    this.character = props.character
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

  getWalkable() {
    return this.walkable
  }

  getCharacter() {
    return this.character
  }

  getId() {
    return this.cellId
  }

  getGridId() {
    return this.gridId
  }

  getPosition() {
    return this.position
  }

  toSnapshot(): CellSnapshot {
    return {
      cellId: this.cellId,
      walkable: this.walkable,
      position: this.position,
      character: this.character?.toSnapshot(),
    }
  }
}

export type CellSnapshot = {
  cellId: string
  walkable: boolean
  position: Position
  character: CharacterSnapshot | undefined
}
