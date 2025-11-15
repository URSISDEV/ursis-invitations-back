import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvitationsTable1763226059597 implements MigrationInterface {
    name = 'CreateInvitationsTable1763226059597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "templateId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD CONSTRAINT "UQ_dab5f55eaf6f40cb5015f5c34cf" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "sectionsData" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "sectionsData"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "UQ_dab5f55eaf6f40cb5015f5c34cf"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "templateId"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "description" text`);
    }

}
