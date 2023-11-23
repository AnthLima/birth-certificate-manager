import { Router } from "express";
import UserController from "./controllers/UserController";
import multer from "multer";
import { storage } from "./middleware/MulterModdleware"; 
import CertificateController from "./controllers/CertificateController";

const upload = multer({ storage: storage });

const routes = Router();

routes.post("/login", UserController.login);
routes.post("/createCertificate", 
    upload.single('file'), 
    CertificateController.receiveDataAndCreateCertificate
)
export default routes;