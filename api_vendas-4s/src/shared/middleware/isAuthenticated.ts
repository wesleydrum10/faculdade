import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppErrors";
import authConfig from '../../config/auth'

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    
    //obter  a autorização que está dentro do cabeçalho da requisição
    let authHeaders = request.headers.authorization

    if(!authHeaders) {
        throw new AppError(`JWT Token is missing`)
    }

    // o nome da variável que contem o token chama-se Beared
    // Beared 
    // vetor[0] = Beared vetor[1] = kgaskgasgkahskagskgakjsasas
    // token conterá o kçkjlkjlkjlkjljljçkjkjljlkjlkj
    let [, token] = authHeaders.split(' ')
    // vamos veirificar se o token é válido

    // tratar erro
    try { // tenta verificar se o token é válido
        let decodedToken = verify(token, authConfig.jwt.secret)
        // let decodedToken = verify(token, authConfig.jwt.secret)
        return next() // deixa a API ser utilizada ->  será consumida
    }
    catch {// se o token não for válido
        throw new AppError(`Invalid Token is missing`)
    }
}