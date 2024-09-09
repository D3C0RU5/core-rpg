import { BaseError } from './base-error'

describe('Testing Base error properties', () => {
  it('Return correct property values', () => {
    // Arrange
    const errorName = 'fake error name'
    const errorKey = 'ANY-ERROR'
    const errorMessage = 'fake massage'
    const errorDetails = 'fake details'

    // Act
    const error = new BaseError(errorName, errorKey, errorMessage, errorDetails)

    // Assert
    expect(error.name).toBe(errorName)
    expect(error.key).toBe(errorKey)
    expect(error.message).toBe(errorMessage)
    expect(error.details).toBe(errorDetails)
    expect(error.stack).toBeTruthy()
  })
})
