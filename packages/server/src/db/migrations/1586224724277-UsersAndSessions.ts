import { MigrationInterface, QueryRunner } from 'typeorm'

export class UsersAndSessions1586224724277 implements MigrationInterface {
    name = 'UsersAndSessions1586224724277'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "session" ("id" SERIAL NOT NULL, "fingerprint" character varying NOT NULL, "ip" character varying(15) NOT NULL, "expires" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))', undefined)
      await queryRunner.query('ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"', undefined)
      await queryRunner.query('DROP TABLE "session"', undefined)
    }
}
