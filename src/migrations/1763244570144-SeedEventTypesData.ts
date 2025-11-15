import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedEventTypesData1763244570144 implements MigrationInterface {
    name = 'SeedEventTypesData1763244570144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insertar tipos de evento iniciales
        await queryRunner.query(`
            INSERT INTO "event_types" ("name", "slug", "description", "isActive") VALUES 
            ('XV Años', 'xv', 'Celebración de los quince años', true),
            ('Boda', 'boda', 'Ceremonia de matrimonio', true),
            ('Cumpleaños', 'cumpleanos', 'Celebración de cumpleaños', true),
            ('Baby Shower', 'baby-shower', 'Celebración antes del nacimiento del bebé', true),
            ('Graduación', 'graduacion', 'Ceremonia de graduación', true),
            ('Aniversario', 'aniversario', 'Celebración de aniversario', true),
            ('Bautismo', 'bautismo', 'Ceremonia de bautismo', true),
            ('Comunión', 'comunion', 'Primera comunión', true)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar los datos insertados
        await queryRunner.query(`DELETE FROM "event_types" WHERE "slug" IN ('xv', 'boda', 'cumpleanos', 'baby-shower', 'graduacion', 'aniversario', 'bautismo', 'comunion')`);
    }

}
