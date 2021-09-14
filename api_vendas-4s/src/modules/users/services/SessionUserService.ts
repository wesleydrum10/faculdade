import { compare } from 'bcryptjs'
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import {sign} from 'jsonwebtoken'

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: User,
    token: string
}

class SessionUserService {
    public async execute({email, password}: IRequest): Promise<IResponse> {
        let userRepository = getCustomRepository(UserRepository)
        let user =  await userRepository.findByEmail(email)
        if(!user) {
            throw new AppError(`Incorrect email/password combination`, 401)
        }
        
        let passwordConfirmed = await compare(password, user.password)

        if(!passwordConfirmed) {
            throw new AppError(`Incorrect email/password combination`, 401)
        }
        let token = sign({}, 'cdee1504d489d3b72e6891c1e3d45628', {
            subject: user.id,
            expiresIn: '1d'
        }) 

        return {
            user, 
            token
        }

    }
}

export default SessionUserService


