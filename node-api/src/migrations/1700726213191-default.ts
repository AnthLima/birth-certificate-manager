import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700726213191 implements MigrationInterface {
    name = 'Default1700726213191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certificates" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "cpf" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "birthDate" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "publicArea" character varying NOT NULL, "typeOfCertificate" character varying NOT NULL, "nameOfFile" character varying NOT NULL, "idOfUser" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_e4c7e31e2144300bea7d89eb165" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "certificates"`);
    }

}
