import { MigrationInterface, QueryRunner } from 'typeorm';

export class Default1700714612095 implements MigrationInterface {
  name = 'Default1700714612095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "typeOfUser" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "password", "typeOfUser") VALUES ('Harry Doe', 'harry@example.com', 'password123', 'admin')`,
    );

    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "password", "typeOfUser") VALUES ('Jane Doe', 'jane@example.com', 'password456', 'client')`,
    );

    await queryRunner.query(
        `INSERT INTO "users" ("name", "email", "password", "typeOfUser") VALUES ('Pool Doe', 'pool@example.com', 'password456', 'client')`,
    );
    
    await queryRunner.query(
    `INSERT INTO "users" ("name", "email", "password", "typeOfUser") VALUES ('James Doe', 'james@example.com', 'password456', 'operator')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users" WHERE "name" = 'John Doe' OR "name" = 'Jane Doe'`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
