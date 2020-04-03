import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPasswordToUser1585924935673 implements MigrationInterface {
    name = 'AddPasswordToUser1585924935673'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ADD "password" character varying NOT NULL', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "password"', undefined)
    }
}
