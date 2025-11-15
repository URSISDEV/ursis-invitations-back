import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTemplatesTableEventTypeRelation1763244546027 implements MigrationInterface {
    name = 'UpdateTemplatesTableEventTypeRelation1763244546027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Agregar la nueva columna eventTypeId
        await queryRunner.query(`ALTER TABLE "templates" ADD "eventTypeId" uuid`);
        
        // Crear la foreign key constraint
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_templates_eventTypeId" FOREIGN KEY ("eventTypeId") REFERENCES "event_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        
        // Nota: La columna eventType (string) se mantendrá temporalmente para migración de datos
        // En una migración posterior se puede eliminar después de migrar los datos
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar la foreign key constraint
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_templates_eventTypeId"`);
        
        // Eliminar la columna eventTypeId
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "eventTypeId"`);
    }

}
