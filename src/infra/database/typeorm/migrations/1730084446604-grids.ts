import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Grids1730084446604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'grids',
        columns: [
          {
            name: 'grid_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'rows',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'columns',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('grids')
  }
}
