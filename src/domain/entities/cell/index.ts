import { Character, CharacterSnapshot } from '../character'
import { Position } from '../../value-objects/position'

export type Occupant = Character // | Monster | Npc | Item

export class Cell {
  // metadata: any[]
  // effects: Effects[],
  // elevation: number,
  // lightLevel: number,
  // visibility: number,
  // resource: Resource

  constructor(
    private cellId: string,
    private walkable: boolean,
    private characters: Character[],
  ) {}

  static create(): Cell {
    const cellId = crypto.randomUUID()
    return new Cell(cellId, true, [])
  }

  hasCharacter(character: Character): boolean {
    const characterExists = this.characters.some(
      _character => _character.getId() === character.getId(),
    )
    return characterExists
  }

  isCellWalkable(): boolean {
    return this.walkable && this.characters.length === 0
  }

  addCharacter(character: Character): void {
    if (this.isCellWalkable() && !this.hasCharacter(character)) {
      this.characters.push(character)
    }
  }

  removeOccupant(character: Character): void {
    if (this.hasCharacter(character)) {
      this.characters = this.characters.filter(
        _character => _character.getId() !== character.getId(),
      )
    }
  }

  getWalkable() {
    return this.walkable
  }

  getCharacters() {
    return this.characters
  }

  toSnapshot() {
    return {
      cellId: this.cellId,
      walkable: this.walkable,
      characters: this.characters.map(character => character.toSnapshot()),
    }
  }
}

export type CellSnapshot = {
  cellId: string
  walkable: boolean
  characters: CharacterSnapshot[]
}
