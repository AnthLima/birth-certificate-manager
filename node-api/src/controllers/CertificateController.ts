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

const certificateUpdateSchema = z.object({
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
    idOfCertificate: z.string().nonempty({ message: "Os dados estão incompletos para criação" }),
    status: z.string().nonempty({ message: "Status é obrigatório." }),
  });

class CertificateController {
  public async receiveDataAndCreateCertificate(req: Request, res: Response) {
    try {
      const { filename } = req.file;

      const validatedData = certificateSchema.parse(req.body);

      if (!filename) {
        return res.status(400).json({
          message: 'Não foi possível criar a certidão',
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
          message: 'Não foi possível criar a certidão',
          success: false
        });
      }
      return res.status(201).json({
        message: 'Certidão criada com sucesso!',
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
        console.error("Erro durante a criação da certidão:", error);
        return res.status(500).json({
          message: 'Erro interno do servidor durante a criação da certidão',
          success: false
        });
      }
    }
  }

  public async updateDataOfCertificate(req: Request, res: Response) {
    try {
      const { filename } = req.file;

      const validatedData = certificateUpdateSchema.parse(req.body);

      if (!filename) {
        return res.status(400).json({
          message: 'Não foi possível criar a certidão',
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
      };

      const certificateRepository = new CertificateRepository();
      const result = await certificateRepository.updateCertificate(body);

      if (!result.success) {
        return res.status(400).json(result);
      }
      return res.status(201).json({
        message: 'Certidão atualizada com sucesso!',
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
        console.error("Erro durante a atualização da certidão:", error);
        return res.status(500).json({
          message: 'Erro interno do servidor durante a atualização da certidão',
          success: false
        });
      }
    }
  }

  public async getAllCertificatesOfSpecificUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const certificateRepository = new CertificateRepository();

        const result = await certificateRepository.getCertificatesByUserId(id.toString());

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json({
            message: 'Certidões encontradas com sucesso!',
            success: true,
            certificates: result.certificates,
        });
    } catch (error) {
        console.error("Erro durante a busca das certidões:", error);
        return res.status(500).json({
            message: 'Erro interno do servidor durante a busca das certidões',
            success: false,
        });
    }
  }

  public async deleteCertificate(req: Request, res: Response) {
    try {
        const { id, idOfCertificate } = req.params;

        const certificateRepository = new CertificateRepository();

        const result = await certificateRepository.deleteCertificateById(id.toString(), idOfCertificate.toString());

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Erro durante a deleção das certidões:", error);
        return res.status(500).json({
            message: 'Erro interno do servidor durante a deleção das certidões',
            success: false,
        });
    }
  }
}

export default new CertificateController();
