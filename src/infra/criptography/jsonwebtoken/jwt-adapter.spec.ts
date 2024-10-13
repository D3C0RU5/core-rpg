import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

const secret = 'fake-secret'
const fakePayload = { name: 'user-name', email: 'any-email' }
const expirationHours = 1

const makeSut = () => {
  const sut = new JwtAdapter(secret, expirationHours)
  return {
    sut,
  }
}

describe('JwtAdapter', () => {
  describe('When calling generate', () => {
    it('Should return generated token', async () => {
      // Arrange
      const { sut } = makeSut()

      // Act
      const token = await sut.generate(fakePayload)

      // Assert
      const result = jwt.decode(token) as object
      expect(result).toEqual(
        expect.objectContaining({ name: fakePayload.name }),
      )
    })
  })

  describe('When calling verify', () => {
    it('Should return true when is valid', async () => {
      // Arrange
      const { sut } = makeSut()
      const token = await sut.generate(fakePayload)
      // Act
      const payload = sut.verify(token)

      // Assert
      expect(payload).toEqual(
        expect.objectContaining({ name: fakePayload.name }),
      )
    })
    it('Should throw when is invalid', async () => {
      // Arrange
      const { sut } = makeSut()
      const token = 'invalid token'

      // Act

      // Assert
      expect(() => sut.verify(token)).toThrow(
        'something goes wrong when verifing token',
      )
    })
  })
})
