import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventTypeToInvitations1762798948197 implements MigrationInterface {
    name = 'AddEventTypeToInvitations1762798948197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" ADD "eventType" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "eventType"`);
    }

}
