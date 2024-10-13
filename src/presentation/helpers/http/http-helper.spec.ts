import { NotFoundError } from '../../../utils/errors/not-found-error'
import { createBaseError } from '../../../utils/factories/error-factory'
import { handleError } from './http-helper'

describe('Http helpers', () => {
  describe('handleError', () => {
    it('should return status 400 when is instance of BaseError', () => {
      // Arrange
      const error = createBaseError()

      // Act
      const response = handleError(error)

      // Assert
      expect(response.statusCode).toBe(400)
      expect(response.body).toBeDefined()
    })

    it('should return status 404 when is instance of NotFound', () => {
      // Arrange
      const error = new NotFoundError('any-key', 'any-message', {})

      // Act
      const response = handleError(error)

      // Assert
      expect(response.statusCode).toBe(404)
      expect(response.body).toBeDefined()
    })

    it('should return status 500 when is Generic errors', () => {
      // Arrange
      const error = new Error()

      // Act
      const response = handleError(error)

      // Assert
      expect(response.statusCode).toBe(500)
      expect(response.body).toBeDefined()
    })

    it('should return status 500 when is object', () => {
      // Arrange
      const error = {}

      // Act
      const response = handleError(error)

      // Assert
      expect(response.statusCode).toBe(500)
      expect(response.body).toBeDefined()
    })
  })
})
