import { Request, Response } from "express";
import { z, ZodError } from "zod";
import CertificateRepository from "../repositories/CertificateRepository";
import { Certificate } from "../entities/Certificate";

const isFileExtensionValid = (filename, validExtensions) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    return extension ? validExtensions.includes(extension) : false;
};

const certificateSchema = z.object({
  fullName: z.string().nonempty({ message: "O nome completo é obrigatório." }),
  cpf: z.string().refine((cpf) => cpf.length === 11, {
    message: "O CPF deve ter 11 dígitos.",
  }),
  phoneNumber: z.string().min(10).max(15, {
    message: "O número de telefone deve ter entre 10 e 15 caracteres.",
  }),
  birthDate: z.string().nonempty({ message: "A data de nascimento é obrigatória." }),
  city: z.string().nonempty({ message: "A cidade é obrigatória." }),
  state: z.string().nonempty({ message: "O estado é obrigatório." }),
  publicArea: z.string().nonempty({ message: "A área pública é obrigatória." }),
  typeOfCertificate: z.string().nonempty({ message: "O tipo de certificado é obrigatório." }),
  idOfUser: z.string().nonempty({ message: "Os dados estão incompletos para criação" }),
});

class CertificateController {
  public async receiveDataAndCreateCertificate(req: Request, res: Response) {
    try {
      const { filename } = req.file;

      const validatedData = certificateSchema.parse(req.body);

      if (!filename) {
        return res.status(400).json({
          message: 'Não foi possível criar o certificado',
          success: false
        });
      }

      if(!isFileExtensionValid(filename,["png", "pdf"])){
        return res.status(400).json({
            message: 'A extensão do arquivo deve ser .png ou .pdf.',
            success: false
          });
      }

      const body = {
        ...validatedData,
        nameOfFile: filename,
        status: "Pendente"
      };

      const certificateRepository = new CertificateRepository();
      const result = await certificateRepository.createCertificate(body as Certificate);

      if (!result) {
        return res.status(400).json({
          message: 'Não foi possível criar o certificado',
          success: false
        });
      }
      return res.status(201).json({
        message: 'Certificado criado com sucesso!',
        success: true
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((validationError) => ({
          message: validationError.message,
          path: validationError.path,
        }));
        return res.status(400).json({
          message: 'Erro de validação',
          errors: validationErrors,
          success: false
        });
      } else {
        console.error("Erro durante a criação do certificado:", error);
        return res.status(500).json({
          message: 'Erro interno do servidor durante a criação do certificado',
          success: false
        });
      }
    }
  }
}

export default new CertificateController();
