import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import { UserRepository } from '../modules/accounts/repostories/implementations/UsersRepository';
import {AppError} from '../errors/AppError';

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('Token missing!', 401);
    }

    const [,token] = authHeader.split(' ');
    try{
        const {sub: user_id} = verify(token, 'b92f3c1ca5d0e05986e514479a50ab46') as IPayload;
        
        const userRepository = new UserRepository();

        const user = await userRepository.findById(user_id);
        
        if(!user){
            throw new AppError('User does not exist!', 401);
        }
        
        request.user = {
            id: user.id
        }

        next();
    }catch(err){
        throw new AppError('Inválid Token!', 401);
    }
}