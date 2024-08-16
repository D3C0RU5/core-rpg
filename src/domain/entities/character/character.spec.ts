import { Character } from '.'

describe('Character testes', () => {
  describe('create unit test', () => {
    it('Return instance', () => {
      // Assert
      const character = Character.create(100, 10, 10)

      // Assert
      expect(character).toBeInstanceOf(Character)
    })
  })

  describe('recover unit test', () => {
    it('Return recovered instance', () => {
      // Assert
      const character = new Character('characterId', 100, 10, 10)

      // Assert
      expect(character).toBeInstanceOf(Character)
    })
  })
})
