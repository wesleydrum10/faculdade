import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import {hash} from 'bcryptjs'

// criar uma inteface -> tipo de dado
interface IRequest {
    name: string,
    email: string,
    password: string,
    avatar: string
}

// criar uma classe 
class CreateUserService {

    // criar um método de execução da criação do usuário
    public async execute({name, email, password, avatar} : IRequest): Promise<User>{
        // recupera um repositório do usuário
       let userRepository = getCustomRepository(UserRepository);
        // verifica se o usuário existe
       let emailExist = await userRepository.findByEmail(email);
       if (emailExist){
           // não podemos cadastrar
           throw new AppError('Já temos usuário com este email');
     
            // lançar uma exceção
       }
       let hashedPassword = await hash(password, 8)
       // usuário não existe
       // vamos criar
       let newUser = userRepository.create({
           name, 
           email, 
           password: hashedPassword,
           avatar
       })
       // vamos salvar no banco
       await userRepository.save(newUser)
       return newUser;
    }
}

export default CreateUserService