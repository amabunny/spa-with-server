import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUuidToSession1586231482253 implements MigrationInterface {
    name = 'AddUuidToSession1586231482253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "refreshToken" uuid NOT NULL DEFAULT uuid_generate_v4()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "refreshToken"`, undefined);
    }

}
