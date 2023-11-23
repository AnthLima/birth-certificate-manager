import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | any;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "birth-certificate-manager-db-1",
    port: 5432,
    username: "postgres",
    password: "example",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    subscribers: [
        "src/subscriber/**/*.ts"
    ],
})
