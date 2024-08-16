import { Character, CharacterSnapshot } from '../character'
import { Position } from '../../value-objects/position'

export class Cell {
  constructor(
    private cellId: string,
    private position: Position,
    private walkable: boolean,
    private character: Character | null = null,
  ) {}

  static create(position: Position, walkable: boolean): Cell {
    const cellId = crypto.randomUUID()
    return new Cell(cellId, position, walkable)
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

  toSnapshot(): CellSnapshot {
    return {
      cellId: this.cellId,
      walkable: this.walkable,
      character: this.character?.toSnapshot(),
    }
  }
}

export type CellSnapshot = {
  cellId: string
  walkable: boolean
  character: CharacterSnapshot | undefined
}
