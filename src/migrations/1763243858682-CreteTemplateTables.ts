import { MigrationInterface, QueryRunner } from "typeorm";

export class CreteTemplateTables1763243858682 implements MigrationInterface {
    name = 'CreteTemplateTables1763243858682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "url" character varying(255) NOT NULL, "imageUrl" character varying(500) NOT NULL, "eventType" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "templates"`);
    }

}
