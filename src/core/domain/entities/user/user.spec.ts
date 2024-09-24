import { Email } from '../../value-objects/email'
import { User } from './user'

const userId = crypto.randomUUID()
const name = 'any_name'
const email = new Email('any-email@example.com')
const password = 'any-password-123'
const token = 'any_token_value'

describe('User testes', () => {
  describe('When call contructor', () => {
    it('Return instance', () => {
      // Arrange
      const user = new User({ userId, name, email, password, token })

      // Assert
      expect(user).toBeInstanceOf(User)
    })
  })

  describe('When call create', () => {
    it('Return instance', () => {
      // Arrange
      const user = User.create(name, email, password)

      // Assert
      expect(user).toBeInstanceOf(User)
    })
  })

  describe('When call Id', () => {
    it('Return id value', () => {
      // Arrange
      const user = new User({ userId, name, email, password, token })

      // Assert
      expect(user.Id).toBe(userId)
    })
  })

  describe('When call Name', () => {
    it('Return name value', () => {
      // Arrange
      const user = new User({ userId, name, email, password, token })

      // Assert
      expect(user.Name).toBe(name)
    })
  })

  describe('When call Email', () => {
    it('Return email value', () => {
      // Arrange
      const user = new User({ userId, name, email, password, token })

      // Assert
      expect(user.Email).toBe(email)
    })
  })

  describe('When call Password', () => {
    it('Return password value', () => {
      // Arrange
      const user = new User({ userId, name, email, password, token })

      // Assert
      expect(user.Password).toBe(password)
    })
  })

  describe('When call Token', () => {
    it('Return token value', () => {
      // Arrange
      const user = new User({ userId, name, email, password, token })

      // Assert
      expect(user.Token).toBe(token)
    })
  })
})
