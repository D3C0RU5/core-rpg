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
    it('Should recover grid instance', () => {
      // Assert
      const character = new Character(100, 10, 10)

      // Assert
      expect(character).toBeInstanceOf(Character)
    })
  })
})
