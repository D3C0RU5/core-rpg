import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('fake-token'),
}))

const secret = 'fake-secret'
const fakePayload = { user: 'user-name' }
const expirationHours = 1

const makeSut = () => {
  const sut = new JwtAdapter(secret, expirationHours)
  return {
    sut,
  }
}

describe('JwtAdapter', () => {
  let signSpy: jest.SpyInstance

  beforeEach(() => {
    signSpy = jest.spyOn(jwt, 'sign')
    jest.clearAllMocks()
  })

  describe('When calling generate', () => {
    it('Should call sign with correct params', () => {
      // Arrange
      const { sut } = makeSut()
      const options = { expiresIn: `${expirationHours}h` }

      // Act
      sut.generate(fakePayload)

      // Assert
      expect(signSpy).toHaveBeenCalledWith(fakePayload, secret, options)
    })

    it('Should return generated token', async () => {
      // Arrange
      const { sut } = makeSut()

      // Act
      const token = await sut.generate(fakePayload)

      // Assert
      expect(token).toBe('fake-token')
    })
  })
})
