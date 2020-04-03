import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddArticlesTable1585916797983 implements MigrationInterface {
    name = 'AddArticlesTable1585916797983'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "article"', undefined)
    }
}
