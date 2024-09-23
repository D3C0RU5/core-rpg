import { Email } from '.'
import { invalidEmailError } from './errors/invalid-email-error'

describe('Email unit test', () => {
  describe('When call constructor', () => {
    const email = 'validEmail'

    const result = new Email(email)

    expect(result).toBeInstanceOf(Email)
  })

  describe('When call create', () => {
    it('Should create a Email with valid email', () => {
      const validEmail = 'valid@mail.com'
      const email = Email.create(validEmail)

      expect(email).toBeInstanceOf(Email)
    })

    it('Should throw when email is invalid', () => {
      const invalidEmail = 'invalid.mail'

      const sut = () => Email.create(invalidEmail)

      expect(sut).toThrow(invalidEmailError('invalidEmail'))
    })

    it('Should throw when email not has mail name', () => {
      const invalidEmail = '@mail.com'

      const sut = () => Email.create(invalidEmail)

      expect(sut).toThrow(invalidEmailError('@mail.com'))
    })

    it('Should throw when email not has domain', () => {
      const invalidEmail = 'user@'

      const sut = () => Email.create(invalidEmail)

      expect(sut).toThrow(invalidEmailError('user@'))
    })
  })

  describe('When call getValue', () => {
    it('Return value', () => {
      const emailValue = 'any_mail@mail.com'

      const email = new Email(emailValue)

      expect(email.Value).toBe(email)
    })
  })
})
