import { faker } from '@faker-js/faker/.'
import { UUID } from './index'

describe('UUID Class', () => {
  it('should create a valid UUID using the static create method', () => {
    // Act
    const uuidInstance = UUID.create()

    // Assert
    expect(uuidInstance).toBeInstanceOf(UUID)
    expect(uuidInstance.Value).toBeDefined()
  })

  it('should assign the value correctly in the constructor', () => {
    // Arrange
    const customValue = faker.string.uuid()

    // Act
    const uuidInstance = new UUID(customValue)

    // Assert
    expect(uuidInstance.Value).toBe(customValue)
  })
})
