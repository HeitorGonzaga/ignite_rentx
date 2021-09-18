import {inject, injectable} from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repostories/IUsersRepository';

import {sign} from 'jsonwebtoken';

import { compare, compareSync} from 'bcryptjs';
import { AppError } from '@shared/errors/AppError';

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase{
    
    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){

    }
    
    async execute({email, password}: IRequest): Promise<IResponse>{
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = compareSync(password, user.password);
        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, 'b92f3c1ca5d0e05986e514479a50ab46', {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export {AuthenticateUserUseCase}