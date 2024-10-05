import { randomUUID } from 'crypto'

type CharacterType = 'player' | 'monster' | 'npc' | 'stub'

export type CharacterProps = {
  characterId: string
  health: number
  movimentation: number
  strength: number
}

export type CharacterSnapshot = {
  characterId: string
  health: number
  movimentation: number
  strength: number
}

export class Character {
  private readonly characterId: string
  private readonly health: number
  private readonly movimentation: number
  private readonly strength: number

  constructor(props: CharacterProps) {
    this.characterId = props.characterId
    this.health = props.health
    this.movimentation = props.movimentation
    this.strength = props.strength
  }

  static create(health: number, movimentation: number, strength: number) {
    const characterId = randomUUID()

    return new Character({ characterId, health, movimentation, strength })
  }

  get Id(): string {
    return this.characterId
  }

  get Health() {
    return this.health
  }

  get Movimentation() {
    return this.movimentation
  }

  get Strength() {
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
