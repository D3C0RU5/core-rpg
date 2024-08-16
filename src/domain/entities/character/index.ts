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

  getHealth() {
    return this.health
  }

  getMovimentation() {
    return this.movimentation
  }

  getStrength() {
    return this.strength
  }

  toSnapshot(): CharacterSnapshot {
    return {
      characterId: this.characterId,
      health: this.health,
      movimentation: this.movimentation,
      strength: this.strength,
    }
  }
}

export type CharacterSnapshot = {
  characterId: string
  health: number
  movimentation: number
  strength: number
}

export class StubFactory {
  static create() {
    return Character.create(100, 10, 10)
  }
}

export class PlayerFactory {
  static create() {
    return Character.create(100, 10, 10)
  }
}

export class MonsterFactory {
  static create() {
    return Character.create(500, 6, 15)
  }
}
