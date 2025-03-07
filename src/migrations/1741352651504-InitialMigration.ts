import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1741352651504 implements MigrationInterface {
    name = 'InitialMigration1741352651504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calendar_events" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" date NOT NULL, "countryCode" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_faf5391d232322a87cdd1c6f30c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calendar_events" ADD CONSTRAINT "FK_1c7bc3511809b48395c3eec5484" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_events" DROP CONSTRAINT "FK_1c7bc3511809b48395c3eec5484"`);
        await queryRunner.query(`DROP TABLE "calendar_events"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
