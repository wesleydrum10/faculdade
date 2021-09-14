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

    // criar um método de execução da criação do Produto
    public async execute({name, email, password, avatar} : IRequest): Promise<User>{
        // recupera um repositório do produto
       let userRepository = getCustomRepository(UserRepository);
        // verifica se o produto existe
       let emailExist = await userRepository.findByEmail(email);
       if (emailExist){
           // não podemos cadastrar
           throw new AppError('Já temos produto com este nome');
     
            // lançar uma exceção
       }
       let hashedPassword = await hash(password, 8)
       // produto não existe
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