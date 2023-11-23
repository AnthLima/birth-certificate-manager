import express from "express";
import routes from "./routes";
import { AppDataSource } from "./data-source";

class App {
  public express: express.Application;

  public constructor() {
    this.initializeApplicationAndDB();
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(routes);
  }

  private initializeApplicationAndDB(): void {
    AppDataSource.initialize().then(() => {
      console.log("Banco inicializado com sucesso");
    }).catch((error) => {
      console.log("Houve problemas com o banco", error);
    })
  }
}

export default new App().express;
