import { MigrationInterface, QueryRunner } from 'typeorm'

export class OptinalPasswordUser1585927222883 implements MigrationInterface {
    name = 'OptinalPasswordUser1585927222883'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "tgContact" DROP NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "tgContact" SET DEFAULT null', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "tgContact" DROP DEFAULT', undefined)
      await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "tgContact" SET NOT NULL', undefined)
    }
}
