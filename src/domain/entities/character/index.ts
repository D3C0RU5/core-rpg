import { randomUUID } from 'crypto'

type CharacterType = 'player' | 'monster' | 'npc' | 'stub'

export class Character {
  constructor(
    private characterId: string,
    private health: number,
    private movimentation: number,
    private strength: number,
  ) {}

  static create(health: number, movimentation: number, strength: number) {
    const characterId = randomUUID()

    return new Character(characterId, health, movimentation, strength)
  }

  getId(): string {
    return this.characterId
  }
}

export class CharacterFactory {
  static create(type: CharacterType) {
    if (type === 'stub') return Character.create(100, 10, 10)

    throw new Error('')
  }
}
