import { NotFoundError } from '../../../errors/not-found-error'

export const gridNotFoundError = (gridId: string) => {
  return new NotFoundError(
    'GRID.NOT_EXISTS',
    'Grid not exists with this uuid.',
    gridId,
  )
}
