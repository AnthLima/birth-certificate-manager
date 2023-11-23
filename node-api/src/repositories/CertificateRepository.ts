import { AppDataSource } from "../data-source";
import { Certificate } from "../entities/Certificate";
import { User } from "../entities/User";
import * as fs from 'fs';
import * as path from 'path';
interface CertificateInterface {
    fullName: string;
    cpf: string;
    phoneNumber: string;
    birthDate: string;
    city: string;
    state: string;
    publicArea: string;
    typeOfCertificate: string;
    nameOfFile: string;
    idOfUser: string;
    status: string;
}
export class CertificateRepository {
  public async createCertificate(data: CertificateInterface ) {
    const certificateRepository = AppDataSource.getRepository(Certificate);

    try {
        const certificate = await certificateRepository.save(data);
        if(!certificate){
            return false;
        }
        return true;
  
      } catch (error) {
        console.error("Erro durante a autenticação:", error);
        return false;
    }
  }

  public async updateCertificate(data): Promise<{ message: string; success: boolean }> {
    const certificateRepository = AppDataSource.getRepository(Certificate);
    const userRepository = AppDataSource.getRepository(User);
  
    try {
      const { idOfUser, idOfCertificate, ...updatedData } = data;
  
      const existingCertificate = await certificateRepository.findOne({where: {id: parseInt(idOfCertificate)}});
  
      if (!existingCertificate) {
        return {
            message: "O certificado informando não foi encontrado na base!",
            success: false
        };
      }
  
      const { typeOfUser } = await userRepository.findOne({ where: { id: parseInt(idOfUser) } });
  
      if ((typeOfUser === 'operator' || typeOfUser === 'client') && existingCertificate.status === 'Emitida') {
        return {
          message: "Não é possível editar certidões já emitidas!",
          success: false
        };
      }

      if (updatedData.nameOfFile !== existingCertificate.nameOfFile) {
        const cleanedFileName = existingCertificate.nameOfFile
          .replace(/\s/g, '_')
          .replace(/[^a-zA-Z0-9_.-]/g, '_');
    
        const filePath = path.join(__dirname, 'uploads', cleanedFileName);
    
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
  
      certificateRepository.merge(existingCertificate, updatedData);
  
      const result = await certificateRepository.save(existingCertificate);
  
      if (!result) {
        return {
          message: "Não foi possível efetuar a atualização da certidão!",
          success: false
        };
      }
  
      return {
        message: "Atualização feita com sucesso!",
        success: true
      };
    } catch (error) {
      console.error("Erro durante a atualização da certidão:", error);
      return {
        message: "Erro durante a atualização da certidão.",
        success: false
      };
    }
  }

  public async getCertificatesByUserId(userId: string): Promise<{ message: string; success: boolean; certificates?: Certificate[] }> {
    const certificateRepository = AppDataSource.getRepository(Certificate);
    const userRepository = AppDataSource.getRepository(User);

    try {
        const user = await userRepository.findOne({where: {id: parseInt(userId)}});

        if (!user) {
            return {
                message: "Usuário não encontrado.",
                success: false,
            };
        }

        const certificates = await certificateRepository.find({ where: { idOfUser: userId } });
        if(certificates.length === 0){
            return {
                message: "Não há certificados na base com este usuário.",
                success: false,
            };
        }
        return {
            message: "Certificados encontrados com sucesso!",
            success: true,
            certificates,
        };
    } catch (error) {
        console.error("Erro durante a busca dos certificados:", error);
        return {
            message: "Erro durante a busca dos certificados.",
            success: false,
        };
    }
}

}

export default CertificateRepository;
