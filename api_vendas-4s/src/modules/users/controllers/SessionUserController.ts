import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import SessionUserService from "../services/SessionUserService";
import User from "../typeorm/entities/User";

export default class SessionUserController {
    
    public async create(request: Request, response: Response): Promise<Response> {
        
        // recupera a informação do usuário - corpo da página
        let {email, password} = request.body
        
        let sessionUser = new SessionUserService();
        let user = await sessionUser.execute({
            email,
            password
        })

        return response.json(user) 
    }
}