import { Router } from "express";

const routes = Router();

routes.get("/test", () => {
    console.log('test route')
});

export default routes;