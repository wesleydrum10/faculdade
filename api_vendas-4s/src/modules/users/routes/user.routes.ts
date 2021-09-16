// vamos utilizar as rotas da dependência do express
import {Router} from 'express'

import UserController from '../controllers/UserController'

// import celebrate
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

// cria a rota do produto
let userRouter = Router()

// cria o controlador 
let userController = new UserController()

// rota de consulta
// não tem o que tratar
userRouter.get('/', userController.index) 

// tratar a obrigatoriedade de termos um id
// userRouter.get('/:id', 
// celebrate({
//     [Segments.PARAMS]: {
//         id: Joi.string().uuid().required()
//     }
// }),
// userController.show)

// trata o erro de exigir corpo da requsição
userRouter.post('/', 
celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        avatar: Joi.string().required()
    }
}),
userController.create)

// userRouter.delete('/:id', 

// celebrate({
//     [Segments.PARAMS]: {
//         id: Joi.string().uuid().required()
//     }
// }),
// userController.delete)

// userRouter.put('/:id', 
// celebrate({
//     [Segments.PARAMS]: {
//         id: Joi.string().uuid().required()
//     },
//     [Segments.BODY]: {
//         name: Joi.string().required(),
//         email: Joi.string().required(),
//         password: Joi.string().required()
//     }
// }),
// userController.update)

export default userRouter