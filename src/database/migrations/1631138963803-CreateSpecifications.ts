import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecifications1631138963803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
           {
               name: 'especifications',
               columns: [
                   {
                        type: 'uuid',
                        name: 'id',
                        isPrimary: true
                   },
                   {
                       type: 'varchar',
                       name: 'name'
                   },
                   {
                       type: 'varchar',
                       name: 'description'
                   },
                   {
                       type: 'timestamp',
                       name:'created_at',
                       default: 'now()'
                   }
               ]
           } 
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('especifications');
    }

}
