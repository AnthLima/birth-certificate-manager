import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserRepository {
  public async authenticateUserByData(email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);

    try {
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return false;
      }

      if (user.password === password) {
        return user;
      }

      return false;

    } catch (error) {
      console.error("Erro durante a autenticação:", error);
      return false;
    }

  }
}

export default UserRepository;
