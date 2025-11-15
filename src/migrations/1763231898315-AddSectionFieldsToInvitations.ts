import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSectionFieldsToInvitations1763231898315 implements MigrationInterface {
    name = 'AddSectionFieldsToInvitations1763231898315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" ADD "sectionsUsed" jsonb`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "sectionsOrder" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "sectionsOrder"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "sectionsUsed"`);
    }

}
