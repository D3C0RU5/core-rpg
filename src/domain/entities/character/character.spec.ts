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

  describe('getId method', () => {
    it('should return a correct snapshot of the character', () => {
      const uuid = randomUUID()
      const character = new Character({
        characterId: uuid,
        health: 100,
        movimentation: 10,
        strength: 15,
      })

      expect(character.getId()).toBe(uuid)
    })
  })

  describe('getHealth method', () => {
    it('should return a correct snapshot of the character', () => {
      const character = new Character({
        characterId: 'any-uuid',
        health: 100,
        movimentation: 10,
        strength: 15,
      })

      expect(character.getHealth()).toBe(100)
    })
  })

  describe('getMovimentation method', () => {
    it('should return a correct snapshot of the character', () => {
      const character = new Character({
        characterId: 'any-uuid',
        health: 100,
        movimentation: 10,
        strength: 15,
      })

      expect(character.getMovimentation()).toBe(10)
    })
  })

  describe('getStrength method', () => {
    it('should return a correct snapshot of the character', () => {
      const character = new Character({
        characterId: 'any-uuid',
        health: 100,
        movimentation: 10,
        strength: 15,
      })

      expect(character.getStrength()).toBe(15)
    })
  })

  describe('toSnapshot method', () => {
    it('should return a correct snapshot of the character', () => {
      const character = Character.create(100, 10, 15)
      const snapshot = character.toSnapshot()

      expect(snapshot.characterId).toBe(character.getId())
      expect(snapshot.health).toBe(character.getHealth())
      expect(snapshot.movimentation).toBe(character.getMovimentation())
      expect(snapshot.strength).toBe(character.getStrength())
    })
  })
})

describe('Factory Tests', () => {
  describe('StubFactory', () => {
    it('should create a character with stub default values', () => {
      const stub = StubFactory.create()

      expect(stub.getHealth()).toBe(100)
      expect(stub.getMovimentation()).toBe(10)
      expect(stub.getStrength()).toBe(10)
    })
  })

  describe('PlayerFactory', () => {
    it('should create a player with default values', () => {
      const player = PlayerFactory.create()

      expect(player.getHealth()).toBe(100)
      expect(player.getMovimentation()).toBe(10)
      expect(player.getStrength()).toBe(10)
    })
  })

  describe('MonsterFactory', () => {
    it('should create a monster with default values', () => {
      const monster = MonsterFactory.create()

      expect(monster.getHealth()).toBe(500)
      expect(monster.getMovimentation()).toBe(6)
      expect(monster.getStrength()).toBe(15)
    })
  })
})
