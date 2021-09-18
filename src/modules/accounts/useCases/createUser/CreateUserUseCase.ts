import {inject, injectable} from 'tsyringe';
import {hashSync} from 'bcryptjs';
import { IUsersRepository } from '@modules/accounts/repostories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/DTO/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';




@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UserRepository')
        private usersRepository: IUsersRepository 
    ){

    }

    async execute({name, email, driver_licence, password}: ICreateUserDTO): Promise<void>{
        const userAlreadExist = await this.usersRepository.findByEmail(email);
        if(userAlreadExist){
            throw new AppError("User already exists");
        }
        const passwordHash = hashSync(password, 8);
        await this.usersRepository.create({name, email, driver_licence, password: passwordHash});
    }
}


export {CreateUserUseCase}