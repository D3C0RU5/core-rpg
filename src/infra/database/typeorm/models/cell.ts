import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { Cell } from '../../../../core/domain/entities/cell'
import { Position } from '../../../../core/domain/value-objects/position'

@Entity({ name: 'cells' })
export class CellModel extends BaseEntity {
  @PrimaryColumn()
  cellId!: string

  @Column()
  gridId!: string

  @Column()
  row!: number

  @Column()
  column!: number

  @Column()
  walkable!: boolean

  mapToUser = () => {
    return new Cell({
      cellId: this.cellId,
      gridId: this.gridId,
      position: new Position({ row: this.row, column: this.column }),
      walkable: this.walkable,
    })
  }
}
