import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Characters1730084459523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'characters',
        columns: [
          {
            name: 'character_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'position_row',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'position_column',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('characters')
  }
}
