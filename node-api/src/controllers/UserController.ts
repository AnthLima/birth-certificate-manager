import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
class UserController {
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if(!email || !password){
           return res.status(400).json({
            message: 'As credenciais são obrigatórias!',
            sucess: false
           });
        }

        const userRepository = new UserRepository();

        const result = await userRepository.authenticateUserByData(email, password);

        if(!result){
            return res.status(400).json({
                message: 'As credenciais são inválidas!', 
                sucess: false
            });
        }

        return res.status(200).json({
            message: 'Login ocorreu com sucesso', 
            sucess: true
        });
    }
}

export default new UserController();