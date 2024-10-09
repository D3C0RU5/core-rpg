import { randomUUID } from 'crypto'
import { Character, StubFactory, PlayerFactory, MonsterFactory } from './' // ajuste o caminho conforme necessário

describe('Character unit test', () => {
  describe('Character create', () => {
    it('should create a character with correct properties', () => {
      const health = 100
      const movimentation = 10
      const strength = 15

      const character = Character.create(health, movimentation, strength)

      expect(character).toBeInstanceOf(Character)
    })
  })

  describe('Id method', () => {
    it('should return a correct snapshot of the character', () => {
      const uuid = randomUUID()
      const character = new Character({
        characterId: uuid,
        health: 100,
        movimentation: 10,
        strength: 15,
      })

      expect(character.Id).toBe(uuid)
    })
  })

  describe('Health method', () => {
    it('should return a correct snapshot of the character', () => {
      const character = new Character({
        characterId: 'any-uuid',
        health: 100,
        movimentation: 10,
        strength: 15,
      })

      expect(character.Health).toBe(100)
    })
  })

  describe('Movimentation method', () => {
    it('should return a correct snapshot of the character', () => {
      const character = new Character({
        characterId: 'any-uuid',
        health: 100,
        movimentation: 10,
        strength: 15,
      })

      expect(character.Movimentation).toBe(10)
    })
  })

  describe('Strength method', () => {
    it('should return a correct snapshot of the character', () => {
      const character = new Character({
        characterId: 'any-uuid',
        health: 100,
        movimentation: 10,
        strength: 15,
      })

      expect(character.Strength).toBe(15)
    })
  })
})

describe('Factory Tests', () => {
  describe('StubFactory', () => {
    it('should create a character with stub default values', () => {
      const stub = StubFactory.create()

      expect(stub.Health).toBe(100)
      expect(stub.Movimentation).toBe(10)
      expect(stub.Strength).toBe(10)
    })
  })

  describe('PlayerFactory', () => {
    it('should create a player with default values', () => {
      const player = PlayerFactory.create()

      expect(player.Health).toBe(100)
      expect(player.Movimentation).toBe(10)
      expect(player.Strength).toBe(10)
    })
  })

  describe('MonsterFactory', () => {
    it('should create a monster with default values', () => {
      const monster = MonsterFactory.create()

      expect(monster.Health).toBe(500)
      expect(monster.Movimentation).toBe(6)
      expect(monster.Strength).toBe(15)
    })
  })
})
