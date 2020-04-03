import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserNicknameToUsername1585925203124 implements MigrationInterface {
    name = 'UserNicknameToUsername1585925203124'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "nickname"', undefined)
      await queryRunner.query('ALTER TABLE "user" ADD "username" character varying NOT NULL', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "username"', undefined)
      await queryRunner.query('ALTER TABLE "user" ADD "nickname" character varying NOT NULL', undefined)
    }
}
