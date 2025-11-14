import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserWhitelistTable1763093498932 implements MigrationInterface {
    name = 'CreateUserWhitelistTable1763093498932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_whitelist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "interestReason" text NOT NULL, "isEventOrganizer" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cf77bfeb47356544adf94679798" UNIQUE ("email"), CONSTRAINT "PK_f920a128933e4caff44c10d44a5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_whitelist"`);
    }

}
