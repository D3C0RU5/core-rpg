import { randomUUID } from 'crypto'
import { gridNotFoundError } from './grid-not-found-error'
import { NotFoundError } from '../../../../../utils/errors/not-found-error'

const sut = gridNotFoundError

describe('gridNotFoundError', () => {
  it('ensure returned error has correct property values', () => {
    const gridUUID = randomUUID()

    const error = sut(gridUUID)

    expect(error).toBeInstanceOf(NotFoundError)
    expect(error.name).toBe('NotFoundError')
    expect(error.key).toBe('GRID.NOT_EXISTS')
    expect(error.message).toBe('Grid not exists with this uuid.')
    expect(error.details?.value).toBe(gridUUID)
  })
})
