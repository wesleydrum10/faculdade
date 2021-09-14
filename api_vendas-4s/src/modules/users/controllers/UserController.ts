import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
// import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";
// import ShowUserService from "../services/ShowUserService";
// import UpdateUserService from "../services/UpdateUserService";
import User from "../typeorm/entities/User";


export default class UserController {
    // perceba que nesta classe não existe regra de negócio
    // método para inserir o produto
    public async create(request: Request, response: Response): Promise<Response> {
        
        // recupera a informação do usuário - corpo da página
        let {name, email, password, avatar} = request.body
        // salva no BD
        let createUser = new CreateUserService();
        let newUser = await createUser.execute({
            name, 
            email,
            password,
            avatar
        })

        return response.json(newUser) // novo produto retornado
    }

    //public async delete(request: Request, response: Response): Promise<Response>{

        //  recupera a informação do usuário - vem na url da requisição
    //     let {id} = request.params
    //     let deleteUserService = new DeleteUserService()
    //     await deleteUserService.execute({ id } )

    //     return response.json([]) // retorna nada
    // }
    // chama o ListUserService
    public async index (request: Request, response: Response): Promise<Response>{

        let listUserService = new ListUserService()
        let users = await listUserService.execute();
        return response.json(users);
    }

    // chama o ShowProductService
    // public async show (request: Request, response: Response): Promise<Response>{
        // id virá pela URL da requisção
    //     let {id} = request.params
    //     let showUserService = new ShowUserService()
    //     let user = await showUserService.execute({id});
    //     return response.json(user);
    // }

    // chama o UpdateProductService
    // public async update(request: Request, response: Response): Promise<Response>{
        // id do produto vem da URL
        // let {id} = request.params
        // restante do produto vem do corpo da página
        // let {name, email, password, avatar} = request.body

        // let updateService = new UpdateUserService() 

        // let user = await updateService.execute({id, name, email, password, avatar})
        
        // return response.json(user)
    // }
}