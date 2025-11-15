import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventTypesTable1763244515646 implements MigrationInterface {
    name = 'CreateEventTypesTable1763244515646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "slug" character varying(50) NOT NULL, "description" character varying(255), "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_event_types_slug" UNIQUE ("slug"), CONSTRAINT "PK_event_types_id" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event_types"`);
    }

}
