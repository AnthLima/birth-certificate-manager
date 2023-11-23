import multer from "multer";
import path from 'path';
import fs from 'fs';

const uploadFolderPath = path.resolve("uploads");
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath);
}

export const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadFolderPath);
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime();
        callback(null, `${time}_${file.originalname}`);
    }
});
