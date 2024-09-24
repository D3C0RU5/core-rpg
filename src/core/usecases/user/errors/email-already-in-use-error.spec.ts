import { emailAlreadyInUseError } from './email-already-in-use-error'

describe('emailAlreadyInUseError unit test', () => {
  it('return error with received email', () => {
    const email = 'any@mail.com'

    const erro = emailAlreadyInUseError(email)

    expect(erro.toSnapshot()).toEqual({
      name: 'InvalidValueError',
      key: 'EMAIL.EMAIL_ALREADY_TAKEN',
      message: 'Email already in use by another user.',
      details: { value: email },
    })
  })
})
