import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}))

const secret = 'fake-secret'
const fakePayload = { user: 'user-name' }
const fakeOptions: jwt.SignOptions = { expiresIn: '1h' }
const makeSut = () => {
  const sut = new JwtAdapter(secret, fakeOptions)

  return {
    secret,
    sut,
  }
}

describe('JwtAdapter', () => {
  let signSpy: jest.SpyInstance

  beforeEach(() => {
    signSpy = jwt.sign as jest.Mock
    jest.clearAllMocks()
  })

  describe('When call generate', () => {
    it('Should call sign with correct params', () => {
      // Arrange
      const { sut } = makeSut()

      // Act
      sut.generate(fakePayload)

      // Assert
      expect(signSpy).toHaveBeenCalledWith(fakePayload, secret, fakeOptions)
    })

    it('Should return generated token', () => {
      // Arrange
      const { sut } = makeSut()
      const fakeToken = 'any-secret'
      signSpy.mockReturnValue(fakeToken)

      // Act
      sut.generate(fakePayload)

      // Assert
      expect(signSpy).toHaveBeenCalledWith(fakePayload, secret, fakeOptions)
    })
  })
})
