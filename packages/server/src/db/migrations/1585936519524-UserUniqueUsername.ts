import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserUniqueUsername1585936519524 implements MigrationInterface {
    name = 'UserUniqueUsername1585936519524'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"', undefined)
    }
}
