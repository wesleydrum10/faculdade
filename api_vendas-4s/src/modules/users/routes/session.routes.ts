// vamos utilizar as rotas da dependência do express
import {Router} from 'express'

import SessionUserController from '../controllers/SessionUserController'

// import celebrate
import {celebrate, Joi, Segments} from 'celebrate'

// cria a rota do produto
let sessionUserRouter = Router()

// cria o controlador 
let sessionUserController = new SessionUserController()

sessionUserRouter.post('/', 
celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}),
sessionUserController.create)

export default sessionUserRouter