import { Size } from '../../value-objects/size'

export type GridProps = {
  gridId: string
  size: Size
}

export class Grid {
  private readonly gridId: string
  private readonly size: Size

  constructor(props: GridProps) {
    this.gridId = props.gridId
    this.size = props.size
  }

  static create(size: Size): Grid {
    const gridId = crypto.randomUUID()

    return new Grid({ gridId, size })
  }

  get Id(): string {
    return this.gridId
  }

  get Size(): Size {
    return this.size
  }
}
