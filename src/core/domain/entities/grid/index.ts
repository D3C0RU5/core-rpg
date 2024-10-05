import { Size, SizeSnapshot } from '../../value-objects/size'

export class Grid {
  constructor(
    private readonly gridId: string,
    private readonly size: Size,
  ) {}

  static create(size: Size): Grid {
    const gridId = crypto.randomUUID()

    return new Grid(gridId, size)
  }

  get Id(): string {
    return this.gridId
  }

  get Size(): Size {
    return this.size
  }

  toSnapshot(): GridSnapshot {
    return {
      gridId: this.Id,
      size: this.Size.toSnapshot(),
    }
  }
}

export type GridSnapshot = {
  gridId: string
  size: SizeSnapshot
}
