import { MigrationInterface, QueryRunner } from "typeorm";

export class Default17007288888888 implements MigrationInterface {
    name = 'Default17007288888888'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
