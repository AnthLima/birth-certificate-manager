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
);

routes.patch("/updateCertificate", 
    upload.single('file'), 
    CertificateController.updateDataOfCertificate
)

routes.get("/certificates/user/:id", 
    CertificateController.getAllCertificatesOfSpecificUser
);

routes.delete(
    "/deleteCertificate/:id/:idOfCertificate",
    CertificateController.deleteCertificate
);

export default routes;