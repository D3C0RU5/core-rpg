import { User } from './user'

const userId = crypto.randomUUID()
const name = 'any_name'
const email = 'anyemail@example.com'
const hashedPassword = 'any-password-123'
const token = 'any_token_value'

describe('User testes', () => {
  describe('When call contructor', () => {
    it('Return instance', () => {
      // Arrange
      const user = new User({ userId, name, email, hashedPassword, token })

      // Assert
      expect(user).toBeInstanceOf(User)
    })
  })

  describe('When call create', () => {
    it('Return instance', () => {
      // Arrange
      const user = User.create(name, email, hashedPassword)

      // Assert
      expect(user).toBeInstanceOf(User)
    })
  })

  describe('When call Id', () => {
    it('Return id value', () => {
      // Arrange
      const user = new User({ userId, name, email, hashedPassword, token })

      // Assert
      expect(user.Id).toBe(userId)
    })
  })

  describe('When call Name', () => {
    it('Return name value', () => {
      // Arrange
      const user = new User({ userId, name, email, hashedPassword, token })

      // Assert
      expect(user.Name).toBe(name)
    })
  })

  describe('When call Email', () => {
    it('Return email value', () => {
      // Arrange
      const user = new User({ userId, name, email, hashedPassword, token })

      // Assert
      expect(user.Email).toBe(email)
    })
  })

  describe('When call Password', () => {
    it('Return password value', () => {
      // Arrange
      const user = new User({ userId, name, email, hashedPassword, token })

      // Assert
      expect(user.HashedPassword).toBe(hashedPassword)
    })
  })

  describe('When call Token', () => {
    it('Return token value', () => {
      // Arrange
      const user = new User({ userId, name, email, hashedPassword, token })

      // Assert
      expect(user.Token).toBe(token)
    })
  })
})
