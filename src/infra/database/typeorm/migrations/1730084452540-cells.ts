import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class Cells1730084452540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cells',
        columns: [
          {
            name: 'cell_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'grid_id',
            type: 'uuid',
          },
          {
            name: 'row_index',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'column_index',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'walkable',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'occupant',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    )
    await queryRunner.createForeignKey(
      'cells',
      new TableForeignKey({
        columnNames: ['grid_id'],
        referencedColumnNames: ['grid_id'],
        referencedTableName: 'grids',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cells')
  }
}
