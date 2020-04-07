import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserIdSessionRelation1586230929245 implements MigrationInterface {
    name = 'UserIdSessionRelation1586230929245'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"', undefined)
        await queryRunner.query('ALTER TABLE "session" ALTER COLUMN "userId" SET NOT NULL', undefined)
        await queryRunner.query('ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"', undefined)
        await queryRunner.query('ALTER TABLE "session" ALTER COLUMN "userId" DROP NOT NULL', undefined)
        await queryRunner.query('ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined)
    }
}
