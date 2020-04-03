import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserNullablePassword1585928172140 implements MigrationInterface {
    name = 'UserNullablePassword1585928172140'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "tgContact" DROP NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "tgContact" SET DEFAULT null', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "tgContact" DROP DEFAULT', undefined)
      await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "tgContact" SET NOT NULL', undefined)
    }
}
