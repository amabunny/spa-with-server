import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1585924666713 implements MigrationInterface {
    name = 'InitialMigration1585924666713'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))', undefined)
      await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "nickname" character varying NOT NULL, "tgContact" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "user"', undefined)
      await queryRunner.query('DROP TABLE "article"', undefined)
    }
}
