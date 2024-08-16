import { Size, SizeSnapshot } from '../../value-objects/size'

export class Grid {
  constructor(
    private gridId: string,
    private size: Size,
  ) {}

  static create(size: Size): Grid {
    const gridId = crypto.randomUUID()

    return new Grid(gridId, size)
  }

  getId(): string {
    return this.gridId
  }

  getSize(): Size {
    return this.size
  }

  toSnapshot(): GridSnapshot {
    return {
      gridId: this.getId(),
      size: this.getSize().toSnapshot(),
    }
  }
}

export type GridSnapshot = {
  gridId: string
  size: SizeSnapshot
}
