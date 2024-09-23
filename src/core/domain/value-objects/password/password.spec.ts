import { Password } from '.'

describe('Password unit test', () => {
  describe('When call constructor', () => {
    it('Return Password instance', () => {
      const password = 'any_password'

      const result = new Password(password)

      expect(result).toBeInstanceOf(Password)
    })
  })

  describe('When call create', () => {
    it('Return Password instance when is valid', () => {
      const password = 'any_password_2'

      const result = Password.create(password)

      expect(result).toBeInstanceOf(Password)
    })

    it('Throw when password is less than 8', () => {
      const smallPassword = '1234567'

      const act = () => Password.create(smallPassword)

      expect(act).toThrow(Error)
    })

    it('Throw when password is greater than 16', () => {
      const longPassword = 'a_giant_password_with_more_than_sixteen_characters'

      const act = () => Password.create(longPassword)

      expect(act).toThrow(Error)
    })

    it('Throw when password miss numbers', () => {
      const passwordWithoutNumbers = 'password_'

      const act = () => Password.create(passwordWithoutNumbers)

      expect(act).toThrow(Error)
    })

    it('Throw when password miss special characters', () => {
      const passwordWithoutSpecialCharacters = 'password1'

      const act = () => Password.create(passwordWithoutSpecialCharacters)

      expect(act).toThrow(Error)
    })
  })

  describe('When call Value', () => {
    it('Return password value', () => {
      // Arrange
      const value = 'password'

      // Act
      const password = new Password(value)

      // Assert
      expect(password.Value).toBe(value)
    })
  })
})
