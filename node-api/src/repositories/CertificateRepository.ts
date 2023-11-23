import { AppDataSource } from "../data-source";
import { Certificate } from "../entities/Certificate";
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
        const certificate = await certificateRepository.create(data);
        if(!certificate){
            return false;
        }

        return true;
  
      } catch (error) {
        console.error("Erro durante a autenticação:", error);
        return false;
    }
  }
}

export default CertificateRepository;
