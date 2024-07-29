import { Character } from '../character'
import { Position } from '../vo/position'

export type Occupant = Character // | Monster | Npc | Item

export class Cell {
  // metadata: any[]
  // effects: Effects[],
  // elevation: number,
  // lightLevel: number,
  // visibility: number,
  // resource: Resource

  constructor(
    private walkable: boolean,
    private characters: Character[],
  ) {}

  static create(): Cell {
    return new Cell(true, [])
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
}
