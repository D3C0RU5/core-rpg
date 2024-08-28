import { Character, CharacterSnapshot } from '../character'
import { Position } from '../../value-objects/position'

export class Cell {
  constructor(
    private cellId: string,
    private gridId: string,
    private position: Position,
    private walkable: boolean,
    private character: Character | null = null,
  ) {}

  static create(gridId: string, position: Position, walkable: boolean): Cell {
    const cellId = crypto.randomUUID()
    return new Cell(cellId, gridId, position, walkable)
  }

  occupied(): boolean {
    return !!this.character
  }

  isWalkable(): boolean {
    return this.walkable && !this.occupied()
  }

  addCharacter(character: Character): boolean {
    if (this.isWalkable()) {
      this.character = character
      return true
    }
    return false
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
