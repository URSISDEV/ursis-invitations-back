import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventTimeToInvitations1762800783908 implements MigrationInterface {
    name = 'AddEventTimeToInvitations1762800783908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" ADD "eventTime" TIME`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "eventDate"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "eventDate" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "eventDate"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "eventDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "eventTime"`);
    }

}
