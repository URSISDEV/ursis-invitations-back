import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveEventTypeColumnFromTemplates1763244831882 implements MigrationInterface {
    name = 'RemoveEventTypeColumnFromTemplates1763244831882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Eliminar la columna eventType (string) que ya no se usa
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "eventType"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Restaurar la columna eventType en caso de rollback
        await queryRunner.query(`ALTER TABLE "templates" ADD "eventType" character varying(50) NOT NULL`);
    }

}
