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

  mapToEntity = () => {
    return new Grid({
      gridId: this.gridId,
      size: new Size({ rows: this.rows, columns: this.columns }),
    })
  }
}
