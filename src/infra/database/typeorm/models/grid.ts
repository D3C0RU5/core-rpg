import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { Grid } from '../../../../core/domain/entities/grid'
import { Size } from '../../../../core/domain/value-objects/size'

@Entity({ name: 'grids' })
export class GridModel extends BaseEntity {
  @PrimaryColumn()
  gridId!: string

  @Column()
  rows!: number

  @Column()
  columns!: number

  mapToUser = () => {
    return new Grid(this.gridId, new Size(this.rows, this.columns))
  }
}
