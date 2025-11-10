import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventDateToInvitations1762800249471 implements MigrationInterface {
    name = 'AddEventDateToInvitations1762800249471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" ADD "eventDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "eventDate"`);
    }

}
