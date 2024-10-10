import { authenticationError } from './authentication-error'

describe('authenticationError unit test', () => {
  it('return error with received email', () => {
    const erro = authenticationError()

    expect(erro.toJson()).toEqual({
      name: 'InvalidValueError',
      key: 'USER.AUTHENTICATION_FAILURE',
      message: 'Failure on authenticate with credentials',
      details: { value: {} },
    })
  })
})
